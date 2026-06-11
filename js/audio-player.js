/* js/audio-player.js — Thème musical, Ora Shel Torah
   Pastille dans le header (desktop) + entrée dans le menu burger (mobile) :
   les deux pilotent le même audio. OFF par défaut, boucle, préférence mémorisée.
   Drop-in autonome. Rollback = retirer la balise <script>. */
(function () {
  'use strict';

  var AUDIO_SRC  = '/audio/theme-anne-frank.mp3';
  var STORAGE_KEY = 'ost_music_pref';
  var GOLD = '#c9a24b';
  var LABEL_OFF = 'Écouter le thème';
  var LABEL_ON  = 'Couper le son';

  function getPref(){ try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; } }
  function setPref(v){ try { localStorage.setItem(STORAGE_KEY, v); } catch(e){} }

  function init() {
    var headerActions = document.querySelector('.header-actions'); // desktop
    var mobileNav     = document.querySelector('.mobile-nav');     // menu burger mobile
    if (!headerActions && !mobileNav) return; // sécurité

    var style = document.createElement('style');
    style.textContent =
      '.ost-music{display:inline-flex;align-items:center;gap:.5em;font:inherit;cursor:pointer;'+
      'border:1px solid '+GOLD+';background:transparent;color:'+GOLD+';padding:.45em .85em;'+
      'border-radius:999px;line-height:1;white-space:nowrap;transition:background .25s,color .25s,box-shadow .25s;}'+
      '.ost-music:hover{background:'+GOLD+';color:#fff;}'+
      '.ost-music__label{font-size:.85em;font-weight:600;letter-spacing:.02em;}'+
      '.ost-music__icon{width:1.05em;height:1.05em;}'+
      '.ost-music[aria-pressed="false"]{animation:ost-glow 2.4s ease-in-out infinite;}'+
      '@keyframes ost-glow{0%,100%{box-shadow:0 0 0 0 rgba(201,162,75,0);}50%{box-shadow:0 0 0 4px rgba(201,162,75,.18);}}'+
      '.ost-eq{display:none;align-items:flex-end;gap:2px;height:1em;}'+
      '.ost-music[aria-pressed="true"] .ost-eq{display:inline-flex;}'+
      '.ost-music[aria-pressed="true"] .ost-music__icon{display:none;}'+
      '.ost-eq span{width:3px;background:currentColor;border-radius:2px;animation:ost-bar .9s ease-in-out infinite;}'+
      '.ost-eq span:nth-child(1){animation-delay:0s;height:40%;}'+
      '.ost-eq span:nth-child(2){animation-delay:.2s;height:80%;}'+
      '.ost-eq span:nth-child(3){animation-delay:.4s;height:55%;}'+
      '@keyframes ost-bar{0%,100%{transform:scaleY(.4);}50%{transform:scaleY(1);}}'+
      /* variante menu mobile : ligne pleine largeur, sans pastille ni halo */
      '.ost-music--menu{display:flex;width:100%;justify-content:flex-start;gap:.6em;'+
      'border:none;border-radius:0;background:transparent;color:'+GOLD+';padding:14px 20px;animation:none!important;}'+
      '.ost-music--menu:hover{background:rgba(201,162,75,.12);color:'+GOLD+';}'+
      '.ost-music--menu .ost-music__label{font-size:1rem;}'+
      '@media (prefers-reduced-motion:reduce){.ost-music{animation:none!important;}.ost-eq span{animation:none!important;}}';
    document.head.appendChild(style);

    var audio = document.createElement('audio');
    audio.id = 'ost-theme-audio';
    audio.loop = true;
    audio.preload = 'none';
    var src = document.createElement('source');
    src.src = AUDIO_SRC; src.type = 'audio/mpeg';
    audio.appendChild(src);
    document.body.appendChild(audio);

    var on = false;
    var buttons = [];

    function reflect(){
      for (var i = 0; i < buttons.length; i++){
        buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
        buttons[i].setAttribute('aria-label', on ? LABEL_ON : LABEL_OFF);
        buttons[i].querySelector('.ost-music__label').textContent = on ? LABEL_ON : LABEL_OFF;
      }
    }
    function startAudio(){
      var p = audio.play();
      if (p && p.then) p.catch(function(){
        var resume = function(){ if (on) audio.play().catch(function(){}); };
        document.addEventListener('pointerdown', resume, { once:true });
      });
    }
    function toggle(){
      on = !on; setPref(on ? 'on' : 'off'); reflect();
      if (on) startAudio(); else audio.pause();
    }
    function makeButton(){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ost-music';
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', LABEL_OFF);
      b.innerHTML =
        '<svg class="ost-music__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
        '<path d="M9 17V5l10-2v12"/><circle cx="6" cy="17" r="3"/><circle cx="16" cy="15" r="3"/></svg>'+
        '<span class="ost-eq" aria-hidden="true"><span></span><span></span><span></span></span>'+
        '<span class="ost-music__label">'+LABEL_OFF+'</span>';
      b.addEventListener('click', toggle);
      buttons.push(b);
      return b;
    }

    // Desktop : pastille à gauche de « Précommander »
    if (headerActions) headerActions.insertBefore(makeButton(), headerActions.firstChild);
    // Mobile : entrée dans le menu burger, juste avant « Précommander »
    if (mobileNav){
      var bm = makeButton(); bm.classList.add('ost-music--menu');
      var pre = mobileNav.querySelector('.btn-precommander-mobile');
      if (pre) mobileNav.insertBefore(bm, pre); else mobileNav.appendChild(bm);
    }

    if (getPref() === 'on') { on = true; reflect(); startAudio(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
