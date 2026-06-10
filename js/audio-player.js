/* js/audio-player.js — Thème musical, Ora Shel Torah
   Bouton engageant dans le header, OFF par défaut, lecture en boucle,
   préférence mémorisée. Drop-in autonome. Rollback = retirer la balise <script>. */
(function () {
  'use strict';

  var AUDIO_SRC  = '/audio/theme-anne-frank.mp3';
  var STORAGE_KEY = 'ost_music_pref';
  var GOLD = '#c9a24b'; // ajuste si ta charte a un or différent
  var LABEL_OFF = 'Écouter le thème';
  var LABEL_ON  = 'Couper le son';

  function getPref(){ try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; } }
  function setPref(v){ try { localStorage.setItem(STORAGE_KEY, v); } catch(e){} }

  function init() {
    var host = document.querySelector('.header-actions');
    if (!host) return; // sécurité

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

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ost-music';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', LABEL_OFF);
    btn.innerHTML =
      '<svg class="ost-music__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
      '<path d="M9 17V5l10-2v12"/><circle cx="6" cy="17" r="3"/><circle cx="16" cy="15" r="3"/></svg>'+
      '<span class="ost-eq" aria-hidden="true"><span></span><span></span><span></span></span>'+
      '<span class="ost-music__label">'+LABEL_OFF+'</span>';
    host.insertBefore(btn, host.firstChild);

    var labelEl = btn.querySelector('.ost-music__label');
    var on = false;
    function reflect(){
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('aria-label', on ? LABEL_ON : LABEL_OFF);
      labelEl.textContent = on ? LABEL_ON : LABEL_OFF;
    }
    function startAudio(){
      var p = audio.play();
      if (p && p.then) p.catch(function(){ // bloqué : on attend le 1er geste
        var resume = function(){ if (on) audio.play().catch(function(){}); };
        document.addEventListener('pointerdown', resume, { once:true });
      });
    }
    btn.addEventListener('click', function(){
      on = !on; setPref(on ? 'on' : 'off'); reflect();
      if (on) startAudio(); else audio.pause();
    });

    if (getPref() === 'on') { on = true; reflect(); startAudio(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
