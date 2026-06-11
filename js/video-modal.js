/* js/video-modal.js — "Un voyage sacré" : bouton flottant + modale vidéo, OST.
   Frère du bouton génèse (en bas à gauche). Ouvre la vidéo en modale, met le
   thème musical en pause pendant la lecture et le reprend à la fermeture.
   Drop-in autonome. Rollback = retirer la balise <script>. */
(function () {
  'use strict';

  var VIDEO_SRC  = 'videos/transmission-web.mp4';
  var POSTER_SRC = 'images/transmission-poster.jpg'; // frame 16:9 ; si absente, ignorée
  var GOLD = '#eda234';            // or du bouton génèse
  var TOOLTIP = 'Un voyage sacré';

  function init() {
    if (document.querySelector('.ost-video-btn')) return;

    var style = document.createElement('style');
    style.textContent =
      '.ost-video-btn{position:fixed;left:24px;bottom:28px;z-index:9990;width:60px;height:60px;'+
      'border-radius:50%;border:2px solid '+GOLD+';background:rgba(20,16,12,.55);color:'+GOLD+';'+
      'cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);'+
      'transition:transform .25s,box-shadow .25s,opacity .3s;box-shadow:0 4px 18px rgba(0,0,0,.35);}'+
      '.ost-video-btn:hover{transform:scale(1.08);box-shadow:0 0 0 6px rgba(237,162,52,.18),0 4px 18px rgba(0,0,0,.35);}'+
      '.ost-video-btn svg{width:24px;height:24px;margin-left:3px;}'+
      '.ost-video-btn__tip{position:absolute;left:72px;top:50%;transform:translateY(-50%);white-space:nowrap;'+
      'background:rgba(20,16,12,.9);color:#f4ecd8;font-size:.8rem;padding:6px 10px;border-radius:6px;'+
      'opacity:0;pointer-events:none;transition:opacity .2s;}'+
      '.ost-video-btn:hover .ost-video-btn__tip{opacity:1;}'+
      '#genesis-modal-overlay.active ~ .ost-video-btn{opacity:0!important;pointer-events:none!important;}'+
      '.ost-video-overlay{position:fixed;inset:0;z-index:10001;display:none;align-items:center;'+
      'justify-content:center;background:rgba(8,6,4,.92);padding:24px;}'+
      '.ost-video-overlay.active{display:flex;}'+
      '.ost-video-box{position:relative;width:min(100%,1100px);}'+
      '.ost-video-box video{width:100%;aspect-ratio:16/9;display:block;border-radius:8px;background:#000;'+
      'box-shadow:0 12px 50px rgba(0,0,0,.6);}'+
      '.ost-video-close{position:absolute;top:-44px;right:0;width:38px;height:38px;border-radius:50%;'+
      'border:none;background:rgba(255,255,255,.12);color:#fff;font-size:24px;line-height:1;cursor:pointer;'+
      'display:flex;align-items:center;justify-content:center;}'+
      '.ost-video-close:hover{background:rgba(255,255,255,.25);}'+
      '@media (max-width:768px){.ost-video-btn{left:16px;bottom:20px;width:52px;height:52px;}'+
      '.ost-video-btn__tip{display:none;}.ost-video-close{top:-46px;}}';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ost-video-btn';
    btn.setAttribute('aria-label', TOOLTIP);
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'+
      '<span class="ost-video-btn__tip">'+TOOLTIP+'</span>';
    document.body.appendChild(btn);

    var overlay = document.createElement('div');
    overlay.className = 'ost-video-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="ost-video-box" role="dialog" aria-modal="true" aria-label="'+TOOLTIP+'">'+
      '<button class="ost-video-close" type="button" aria-label="Fermer">&times;</button>'+
      '<video controls preload="none"'+(POSTER_SRC ? (' poster="'+POSTER_SRC+'"') : '')+'>'+
      '<source src="'+VIDEO_SRC+'" type="video/mp4">'+
      'Votre navigateur ne supporte pas la lecture vidéo.'+
      '</video></div>';
    document.body.appendChild(overlay);

    var video = overlay.querySelector('video');
    var closeBtn = overlay.querySelector('.ost-video-close');
    var themeWasPlaying = false;

    function theme(){ return document.getElementById('ost-theme-audio'); }

    function open(){
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      btn.style.opacity = '0'; btn.style.pointerEvents = 'none';
      var p = video.play();
      if (p && p.catch) p.catch(function(){});
    }
    function close(){
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      btn.style.opacity = ''; btn.style.pointerEvents = '';
      video.pause();
      try { video.currentTime = 0; } catch(e){}
      if (themeWasPlaying){ var t = theme(); if (t) t.play().catch(function(){}); themeWasPlaying = false; }
    }

    video.addEventListener('play', function(){
      var t = theme();
      if (t && !t.paused){ themeWasPlaying = true; t.pause(); }
    });

    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && overlay.classList.contains('active')) close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
