console.log('🔥 Script chargé');

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
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalId = this.getAttribute('data-modal');
            
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
        overlay.dataset.openTime = Date.now();
        overlay.classList.add('active');
        
        // FORCER STYLES UNIQUEMENT SUR MOBILE (< 1024px)
        if (window.innerWidth < 1024) {
            
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.zIndex = '999999';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.98)'; // Opacité augmentée
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            
            const modal = overlay.querySelector('.content-discovery-modal');
            if (modal) {
                modal.style.display = 'block';
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
                modal.style.position = 'relative';
                
                // Styles pour les éléments internes de la modale
                const wrapper = modal.querySelector('.content-discovery-wrapper');
                if (wrapper) {
                    wrapper.style.display = 'flex';
                    wrapper.style.flexDirection = 'column'; // Stack sur mobile
                    wrapper.style.width = '100%';
                    wrapper.style.height = '100%';
                    wrapper.style.overflow = 'hidden';
                }
                
                const leftCol = modal.querySelector('.content-discovery-left');
                if (leftCol) {
                    leftCol.style.flex = '1';
                    leftCol.style.overflowY = 'auto';
                    leftCol.style.padding = '2rem';
                    leftCol.style.maxHeight = '60vh'; // 60% pour le texte
                }
                
                const rightCol = modal.querySelector('.content-discovery-right');
                if (rightCol) {
                    rightCol.style.flex = '1';
                    rightCol.style.overflowY = 'auto';
                    rightCol.style.padding = '1rem';
                    rightCol.style.maxHeight = '40vh'; // 40% pour la galerie
                    rightCol.style.display = 'flex';
                    rightCol.style.flexDirection = 'column';
                }
                
                const galleryGrid = modal.querySelector('.gallery-grid');
                if (galleryGrid) {
                    galleryGrid.style.display = 'grid';
                    galleryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                    galleryGrid.style.gap = '10px';
                    galleryGrid.style.width = '100%';
                }
                
                // Bouton fermer
                const closeBtn = modal.querySelector('.content-discovery-close');
                if (closeBtn) {
                    closeBtn.style.display = 'flex';
                    closeBtn.style.position = 'fixed';
                    closeBtn.style.top = '20px';
                    closeBtn.style.right = '20px';
                    closeBtn.style.zIndex = '1000000';
                }
                
                // Fond de la modale
                modal.style.background = '#1a1a2e';
                modal.style.color = '#ffffff';
                
                // Header et titre
                const header = modal.querySelector('.content-discovery-header');
                if (header) {
                    const h2 = header.querySelector('h2');
                    if (h2) {
                        h2.style.color = '#d4af37'; // Or
                        h2.style.fontSize = '2rem';
                        h2.style.marginBottom = '1rem';
                    }
                    const subtitle = header.querySelector('.content-discovery-subtitle');
                    if (subtitle) {
                        subtitle.style.color = '#aaaaaa';
                        subtitle.style.fontSize = '1.1rem';
                    }
                }
                
                // Body - sections h3 en or
                const sections = modal.querySelectorAll('.content-discovery-section h3');
                sections.forEach(h3 => {
                    h3.style.color = '#d4af37'; // Or
                    h3.style.fontSize = '1.5rem';
                    h3.style.marginTop = '1.5rem';
                    h3.style.marginBottom = '1rem';
                });
                
                // Tous les paragraphes et listes en blanc
                const paragraphs = modal.querySelectorAll('p, li');
                paragraphs.forEach(p => {
                    p.style.color = '#dddddd';
                    p.style.lineHeight = '1.6';
                });
                
                // Spécifications compactes
                const specs = modal.querySelectorAll('.spec-item-compact');
                specs.forEach(spec => {
                    spec.style.background = 'rgba(255, 255, 255, 0.1)';
                    spec.style.padding = '1rem';
                    spec.style.borderRadius = '8px';
                    const strong = spec.querySelector('strong');
                    if (strong) strong.style.color = '#d4af37';
                    const span = spec.querySelector('span');
                    if (span) span.style.color = '#ffffff';
                });
            }
        }
        
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


