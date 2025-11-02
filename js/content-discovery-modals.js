/* ========================================
   MODALES DÉCOUVRIR LE CONTENU
   Gestion des modales avec layout 2/3 - 1/3
   Carrousel vertical et navigation
   ======================================== */
   alert('🔥 SCRIPT CHARGÉ !');
console.log('🔥 Script chargé');
alert('Script chargé !');

let isOpening = false;

console.log('🎯 content-discovery-modals.js chargé');

// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation des modales content-discovery');
    
    initContentDiscoveryModals();
    
    console.log('✅ Modales content-discovery initialisées');
});

/* ========================================
   GESTION OUVERTURE/FERMETURE
   ======================================== */

function initContentDiscoveryModals() {
    console.log('🎯 Initialisation modales "Découvrir le contenu"');
    
    // Boutons d'ouverture avec data-modal
    const buttons = document.querySelectorAll('[data-modal^="content-discovery-"]');
    alert('Boutons trouvés : ' + buttons.length);
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalId = this.getAttribute('data-modal');
            alert('1. Clic détecté sur : ' + modalId);
            
            const gameId = modalId.replace('content-discovery-', '');
            
            if (gameId) {
                openContentDiscoveryModal(gameId, e);
            }
        });
    });
    
    // Bouton de fermeture X
    document.querySelectorAll('.content-discovery-close').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const overlay = this.closest('.content-discovery-overlay');
            if (overlay) {
                closeContentDiscoveryModal(overlay);
            }
        });
    });
    
    // Clic sur l'overlay (pas sur la modal)
    document.querySelectorAll('.content-discovery-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            // Ne fermer QUE si la modale est vraiment active depuis au moins 500ms
            if (e.target === this && this.classList.contains('active')) {
                const openTime = this.dataset.openTime || 0;
                const now = Date.now();
                if (now - openTime > 500) {
                    closeContentDiscoveryModal(this);
                }
            }
        });
    });
    
    // Touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.content-discovery-overlay.active');
            if (activeModal) {
                closeContentDiscoveryModal(activeModal);
            }
        }
    });
    
    // Empêcher la propagation des clics dans la modal
    document.querySelectorAll('.content-discovery-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

function openContentDiscoveryModal(gameId, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    isOpening = true;
    
    console.log('🎯 Ouverture modale découverte contenu:', gameId);
    
    const overlay = document.getElementById(`content-discovery-${gameId}`);
    alert('2. Overlay trouvé : ' + (overlay ? 'OUI' : 'NON'));
    if (!overlay) {
        console.error('❌ Overlay introuvable:', gameId);
        return;
    }
    
    // Générer le carrousel dynamiquement
    buildCarousel(overlay, gameId);
    
    // Désactiver le scroll du body
    document.body.style.overflow = 'hidden';
    
    // Désactiver temporairement le listener de fermeture sur l'overlay
    overlay.style.pointerEvents = 'none';
    
    // Afficher l'overlay avec animation
    overlay.style.display = 'flex';
    setTimeout(() => {
        alert('3. Ajout classe active');
        overlay.dataset.openTime = Date.now();
        overlay.classList.add('active');
        alert('4. Classes : ' + overlay.className);
        
        // Réactiver les clics après l'animation
        setTimeout(() => {
            overlay.style.pointerEvents = 'auto';
        }, 350);
    }, 10);
    
    // Désactiver le flag après 500ms
    setTimeout(() => {
        isOpening = false;
    }, 500);
}

function closeContentDiscoveryModal(overlay) {
    // Empêcher la fermeture si on est en train d'ouvrir
    if (isOpening) {
        console.log('⏸️ Fermeture bloquée - modale en cours d\'ouverture');
        return;
    }
    
    console.log('❌ Fermeture modale découverte contenu');
    
    // Animation de fermeture
    overlay.classList.remove('active');
    
    // Réactiver le scroll du body
    document.body.style.overflow = '';
    
    // Masquer après l'animation
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

/* ========================================
   GÉNÉRATION GALERIE D'IMAGES
   ======================================== */

function buildCarousel(overlay, gameId) {
    alert('5. buildCarousel appelé pour ' + gameId);
    console.log('🔧 buildCarousel appelé pour', gameId);
    
    // Vérification stricte de l'overlay
    if (!overlay || !overlay.classList.contains('content-discovery-overlay')) {
        console.error('❌ Overlay invalide');
        return;
    }
    
    // Récupérer la config pour ce jeu
    const config = GALLERY_CONFIG[gameId];
    if (!config || !config.length) {
        console.error('❌ Pas de configuration de galerie pour:', gameId);
        return;
    }
    
    console.log(`🎨 Construction galerie pour ${gameId} avec ${config.length} items`);
    
    // Trouver le container de droite
    const rightContainer = overlay.querySelector('.content-discovery-right');
    if (!rightContainer) {
        console.error('❌ Container droite introuvable pour', gameId);
        return;
    }
    
    // Vérifier que rightContainer est bien dans overlay
    if (!overlay.contains(rightContainer)) {
        console.error('❌ rightContainer n\'est pas dans overlay !');
        return;
    }
    
    console.log('✅ rightContainer trouvé, construction du carousel');
    
    // Vider proprement SANS innerHTML
    while (rightContainer.firstChild) {
        rightContainer.removeChild(rightContainer.firstChild);
    }
    
    // Créer la gallery-grid
    const galleryGrid = document.createElement('div');
    galleryGrid.className = 'gallery-grid';
    
    // Ajouter les items
    config.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        if (item.type === 'image') {
            galleryItem.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        } else if (item.type === 'video') {
            galleryItem.innerHTML = `<video muted><source src="${item.src}" type="video/mp4"></video>`;
        }
        
        // Clic pour ouvrir en lightbox
        galleryItem.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(config, index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Ajouter la grille au container
    rightContainer.appendChild(galleryGrid);
    
    console.log('✅ Carousel construit avec', config.length, 'items');
}

/* ========================================
   LIGHTBOX PLEIN ÉCRAN
   ======================================== */

function openLightbox(config, startIndex) {
    let currentIndex = startIndex;
    
    // Créer le lightbox s'il n'existe pas
    let lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'gallery-lightbox';
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Fermer">×</button>
            <button class="lightbox-nav prev" aria-label="Précédent">‹</button>
            <div class="lightbox-content"></div>
            <button class="lightbox-nav next" aria-label="Suivant">›</button>
        `;
        document.body.appendChild(lightbox);
    }
    
    const content = lightbox.querySelector('.lightbox-content');
    const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav.next');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    function showImage(index) {
        const item = config[index];
        if (item.type === 'image') {
            content.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        } else if (item.type === 'video') {
            content.innerHTML = `<video controls autoplay muted><source src="${item.src}" type="video/mp4"></video>`;
        }
        currentIndex = index;
    }
    
    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigation
    prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + config.length) % config.length;
        showImage(currentIndex);
    };
    
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % config.length;
        showImage(currentIndex);
    };
    
    closeBtn.onclick = close;
    
    // Clic sur l'overlay pour fermer
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            close();
        }
    };
    
    // Échap pour fermer
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            close();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // Flèches clavier pour naviguer
    document.addEventListener('keydown', function arrowHandler(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Ouvrir le lightbox
    showImage(currentIndex);
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('active');
}


