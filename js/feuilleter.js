/* js/feuilleter.js — "Feuilleter le livre" : aperçu façon livre feuilletable.
   Gabarit unique. Pages dans animation/.../page1.jpg …
   Déclencheur : [data-feuilleter] + data-pages="N" (+ data-img-base si multi-livres).

   v5 — Init fiable : flipbook construit seulement après modale visible (dimensions
   non nulles) ET images décodées. Conteneur avec largeur/hauteur explicites.
   Zoom loupe retiré des pages du flipbook (reste sur la couverture gabarit).
   Conteneur #ost-feuill-flip recréé à chaque ouverture (évite le plantage StPageFlip). */
(function () {
  'use strict';

  var DEFAULT_IMG_BASE = 'animation/images/page';
  var IMG_EXT   = '.jpg';
  var MAX_PAGES = 40;
  var LIB_URL   = 'https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.js';

  var overlay, box, zoomWrap, container, pageFlip;
  var openGen = 0;
  var libPromise = null;
  var cache = {}; // imgBase+count -> { srcs, firstRatio }

  function cacheKey(imgBase, count) {
    return imgBase + '|' + (count || 0);
  }

  function preloadDecode(list, done) {
    var pending = list.length, ok = [], ratio = 0;
    if (!pending) { done([], 0); return; }
    list.forEach(function (src, i) {
      var im = new Image();
      function finish(success) {
        if (success) {
          ok[i] = src;
          if (i === 0) ratio = im.naturalWidth / im.naturalHeight;
        }
        if (--pending === 0) done(ok.filter(Boolean), ratio);
      }
      im.onload = function () {
        if (im.decode) {
          im.decode().then(function () { finish(true); }).catch(function () { finish(true); });
        } else {
          finish(true);
        }
      };
      im.onerror = function () { finish(false); };
      im.src = src;
    });
  }

  function detect(imgBase, done) {
    var found = [];
    (function probe(i) {
      if (i > MAX_PAGES) { done(found); return; }
      var im = new Image();
      im.onload = function () { found.push(imgBase + i + IMG_EXT); probe(i + 1); };
      im.onerror = function () { done(found); };
      im.src = imgBase + i + IMG_EXT;
    })(1);
  }

  function loadImages(imgBase, count) {
    var key = cacheKey(imgBase, count);
    if (cache[key] && cache[key].srcs.length) {
      return Promise.resolve(cache[key]);
    }
    return new Promise(function (resolve) {
      function finish(list) {
        preloadDecode(list, function (srcs, firstRatio) {
          var entry = { srcs: srcs, firstRatio: firstRatio || 0.7 };
          if (srcs.length) cache[key] = entry;
          resolve(entry);
        });
      }
      if (count && count > 0) {
        var list = [];
        for (var i = 1; i <= count; i++) list.push(imgBase + i + IMG_EXT);
        finish(list);
      } else {
        detect(imgBase, finish);
      }
    });
  }

  function loadLib() {
    if (window.St && window.St.PageFlip) return Promise.resolve();
    if (libPromise) return libPromise;
    libPromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = LIB_URL;
      s.onload = function () { resolve(); };
      s.onerror = function () {
        libPromise = null;
        console.error('[feuilleter] StPageFlip non chargée — vérifier LIB_URL');
        reject(new Error('StPageFlip'));
      };
      document.head.appendChild(s);
    });
    return libPromise;
  }

  function ensureModal() {
    if (overlay) return;
    var style = document.createElement('style');
    style.textContent =
      '.ost-feuill-overlay{position:fixed;inset:0;z-index:10002;display:none;align-items:center;' +
      'justify-content:center;background:rgba(8,6,4,.94);padding:20px;box-sizing:border-box;}' +
      '.ost-feuill-overlay.active{display:flex;}' +
      '.ost-feuill-box{position:relative;box-sizing:border-box;min-width:min(90vw,320px);}' +
      '.ost-feuill-zoom{overflow:hidden;line-height:0;border-radius:3px;box-sizing:border-box;}' +
      '#ost-feuill-flip{display:block;box-sizing:border-box;}' +
      '.ost-feuill-close{position:absolute;top:-44px;right:0;width:38px;height:38px;border-radius:50%;' +
      'border:none;background:rgba(255,255,255,.14);color:#fff;font-size:24px;line-height:1;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;z-index:3;}' +
      '.ost-feuill-close:hover{background:rgba(255,255,255,.28);}' +
      '.ost-feuill-hint{position:absolute;bottom:-36px;left:0;right:0;text-align:center;' +
      'color:#cbb88a;font-size:.8rem;letter-spacing:.02em;white-space:nowrap;overflow:hidden;' +
      'text-overflow:ellipsis;padding:0 8px;box-sizing:border-box;}' +
      '.ost-feuill-loader{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' +
      'justify-content:center;gap:14px;color:#cbb88a;font-size:.9rem;min-width:60vw;min-height:60vh;' +
      'box-sizing:border-box;z-index:2;}' +
      '.ost-feuill-spin{width:42px;height:42px;border:3px solid rgba(201,162,75,.25);' +
      'border-top-color:#c9a24b;border-radius:50%;animation:ost-spin .8s linear infinite;}' +
      '@keyframes ost-spin{to{transform:rotate(360deg);}}' +
      '.ost-feuill-box.loading #ost-feuill-flip,.ost-feuill-box.loading .ost-feuill-hint{visibility:hidden;}' +
      '.ost-feuill-box:not(.loading) .ost-feuill-loader{display:none;}' +
      '@media (max-width:768px){' +
      '.ost-feuill-close{top:-42px;}' +
      '.ost-feuill-hint{bottom:-40px;white-space:normal;line-height:1.35;}' +
      '}';
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.className = 'ost-feuill-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="ost-feuill-box loading">' +
      '<button class="ost-feuill-close" type="button" aria-label="Fermer">&times;</button>' +
      '<div class="ost-feuill-zoom"><div id="ost-feuill-flip"></div></div>' +
      '<div class="ost-feuill-loader"><div class="ost-feuill-spin"></div><span>Chargement du livre…</span></div>' +
      '<div class="ost-feuill-hint">Glissez ou cliquez les bords pour tourner les pages</div>' +
      '</div>';
    document.body.appendChild(overlay);
    box = overlay.querySelector('.ost-feuill-box');
    zoomWrap = overlay.querySelector('.ost-feuill-zoom');
    container = overlay.querySelector('#ost-feuill-flip');

    overlay.querySelector('.ost-feuill-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  function waitForLayout(gen) {
    return new Promise(function (resolve) {
      var tries = 0;
      function tick() {
        if (gen !== openGen) { resolve(false); return; }
        if (!overlay || !overlay.classList.contains('active')) { resolve(false); return; }
        var r = overlay.getBoundingClientRect();
        if (r.width > 40 && r.height > 40) {
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              resolve(gen === openGen);
            });
          });
          return;
        }
        if (++tries > 60) { resolve(false); return; }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function calcPageSize(firstRatio) {
    var ratio = firstRatio || 0.7;
    var wide = window.innerWidth >= 820;
    var shown = wide ? 2 : 1;
    // Largeur réelle de la modale (padding inclus), pas window seul → évite le crop
    var ov = overlay ? overlay.getBoundingClientRect() : null;
    var availW = ov && ov.width > 0
      ? Math.max(280, ov.width - 48)
      : window.innerWidth * (wide ? 0.90 : 0.96);
    var availH = ov && ov.height > 0
      ? Math.max(240, ov.height - 96)
      : window.innerHeight * 0.86;
    var pageH = Math.min(availH, (availW / shown) / ratio);
    var pageW = pageH * ratio;
    if (pageW * shown > availW) {
      pageW = availW / shown;
      pageH = pageW / ratio;
    }
    return {
      pageW: Math.max(120, Math.round(pageW)),
      pageH: Math.max(160, Math.round(pageH)),
      shown: shown
    };
  }

  function applyBoxSize(size) {
    var bookW = size.pageW * size.shown;
    var bookH = size.pageH;
    box.style.width = bookW + 'px';
    box.style.height = bookH + 'px';
    zoomWrap.style.width = bookW + 'px';
    zoomWrap.style.height = bookH + 'px';
    container.style.width = bookW + 'px';
    container.style.height = bookH + 'px';
  }

  function destroyFlip() {
    if (pageFlip) {
      try { pageFlip.destroy(); } catch (e) { /* ignore */ }
      pageFlip = null;
    }
  }

  /** Remplace le nœud flip pour éviter l'état interne cassé de StPageFlip au 2e open. */
  function resetFlipNode() {
    destroyFlip();
    if (!zoomWrap) return;
    var fresh = document.createElement('div');
    fresh.id = 'ost-feuill-flip';
    if (container && container.parentNode === zoomWrap) {
      zoomWrap.replaceChild(fresh, container);
    } else {
      zoomWrap.innerHTML = '';
      zoomWrap.appendChild(fresh);
    }
    container = fresh;
  }

  function buildFlip(gen, srcs, firstRatio) {
    if (gen !== openGen) return;
    resetFlipNode();

    var size = calcPageSize(firstRatio);
    applyBoxSize(size);

    // Une frame après le reset DOM + dimensions explicites
    requestAnimationFrame(function () {
      if (gen !== openGen) return;
      try {
        pageFlip = new St.PageFlip(container, {
          width: size.pageW,
          height: size.pageH,
          size: 'fixed',
          usePortrait: true,
          showCover: true,
          maxShadowOpacity: 0.5,
          flippingTime: 700,
          useMouseEvents: true,
          mobileScrollSupport: true
        });
        pageFlip.loadFromImages(srcs);
      } catch (err) {
        console.error('[feuilleter] buildFlip', err);
        var loaderText = box.querySelector('.ost-feuill-loader span');
        if (loaderText) loaderText.textContent = 'Aperçu indisponible';
        box.classList.remove('loading');
        return;
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (gen !== openGen) return;
          try {
            if (pageFlip && typeof pageFlip.update === 'function') pageFlip.update();
          } catch (e) { /* ignore */ }
          box.classList.remove('loading');
        });
      });
    });
  }

  function openModal(count, imgBase) {
    var gen = ++openGen;
    var base = imgBase || DEFAULT_IMG_BASE;

    ensureModal();
    resetFlipNode();
    box.classList.add('loading');
    box.style.width = '';
    box.style.height = '';
    zoomWrap.style.width = '';
    zoomWrap.style.height = '';

    var loaderText = box.querySelector('.ost-feuill-loader span');
    if (loaderText) loaderText.textContent = 'Chargement du livre…';

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    Promise.all([loadLib(), loadImages(base, count), waitForLayout(gen)])
      .then(function (results) {
        if (gen !== openGen) return;
        var entry = results[1];
        var layoutOk = results[2];
        if (!entry || !entry.srcs.length || !layoutOk) {
          if (loaderText) loaderText.textContent = 'Aperçu indisponible';
          box.classList.remove('loading');
          return;
        }
        buildFlip(gen, entry.srcs, entry.firstRatio);
      })
      .catch(function (err) {
        if (gen !== openGen) return;
        console.error('[feuilleter] openModal', err);
        if (loaderText) loaderText.textContent = 'Aperçu indisponible';
        box.classList.remove('loading');
      });
  }

  function closeModal() {
    if (!overlay) return;
    openGen++;
    resetFlipNode();
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    box.classList.add('loading');
    box.style.width = '';
    box.style.height = '';
    if (zoomWrap) {
      zoomWrap.style.width = '';
      zoomWrap.style.height = '';
    }
  }

  function init() {
    var t = document.querySelectorAll('[data-feuilleter]');
    for (var i = 0; i < t.length; i++) {
      (function (el) {
        var n = parseInt(el.getAttribute('data-pages'), 10) || 0;
        var imgBase = el.getAttribute('data-img-base') || DEFAULT_IMG_BASE;
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openModal(n, imgBase);
        });
      })(t[i]);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
