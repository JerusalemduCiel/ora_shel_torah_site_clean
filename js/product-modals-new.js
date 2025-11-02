(function() {
  console.log('Init modales produits');
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    initProductModals();
    console.log('Modales OK');
  }
  
  function initProductModals() {
    var productBoxes = document.querySelectorAll('.game-box[data-game]');
    console.log('Boites: ' + productBoxes.length);
    
    for (var i = 0; i < productBoxes.length; i++) {
      var box = productBoxes[i];
      var gameId = box.getAttribute('data-game');
      console.log('Boite ' + gameId);
      
      box.onclick = function() {
        var id = this.getAttribute('data-game');
        var modalId = 'modal-product-' + id;
        console.log('Clic: ' + id);
        
        var modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
          console.log('Modale ouverte');
        } else {
          console.error('Modale introuvable: ' + modalId);
        }
      };
    }
    
    var closeBtns = document.querySelectorAll('.modal-product .modal-close');
    for (var j = 0; j < closeBtns.length; j++) {
      closeBtns[j].onclick = function() {
        var modal = this.closest('.modal-product');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      };
    }
    
    var overlays = document.querySelectorAll('.modal-product-overlay');
    for (var k = 0; k < overlays.length; k++) {
      overlays[k].onclick = function() {
        var modal = this.closest('.modal-product');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      };
    }
  }
})();

function changeImage(gameId, imageSrc) {
  var mainImage = document.getElementById(gameId + '-main-image');
  if (mainImage) {
    mainImage.src = imageSrc;
    var modal = document.getElementById('modal-product-' + gameId);
    if (modal) {
      var thumbs = modal.querySelectorAll('.thumbnail');
      for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove('active');
        if (thumbs[i].src === imageSrc) {
          thumbs[i].classList.add('active');
        }
      }
    }
  }
}