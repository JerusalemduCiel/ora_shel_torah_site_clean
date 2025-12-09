/* ========================================
   MODALES RÈGLES DU JEU
   ======================================== */

(function() {
    'use strict';

    // Configuration des images par jeu
    const RULES_CONFIG = {
        jdc: {
            title: 'Règles du jeu - Jérusalem du Ciel',
            images: [
                { src: 'images/regles-jdc-recto.png', alt: 'Règles du jeu Jérusalem du Ciel - Recto' },
                { src: 'images/regles-jdc-verso.png', alt: 'Règles du jeu Jérusalem du Ciel - Verso' }
            ],
            layout: 'jdc' // Toujours empilé verticalement
        },
        moh: {
            title: 'Règles du jeu - Minhag ou Halakha',
            images: [
                { src: 'images/regles-moh-recto.png', alt: 'Règles du jeu Minhag ou Halakha - Recto' },
                { src: 'images/regles-moh-verso.png', alt: 'Règles du jeu Minhag ou Halakha - Verso' }
            ],
            layout: 'moh' // Côte à côte sur desktop, empilé sur mobile
        },
        poz: {
            title: 'Règles du jeu - Poz\'ta Mitsvah',
            images: [
                { src: 'images/regles-poz-recto.png', alt: 'Règles du jeu Poz\'ta Mitsvah - Recto' },
                { src: 'images/regles-poz-verso.png', alt: 'Règles du jeu Poz\'ta Mitsvah - Verso' }
            ],
            layout: 'poz' // Côte à côte sur desktop, empilé sur mobile
        }
    };

    let modalInitialized = false;
    let overlayElement = null;

    /* ========================================
       INITIALISATION
       ======================================== */

    function init() {
        // Créer la modale dans le DOM
        createModal();

        // Intercepter les boutons "Règles du jeu"
        interceptRulesButtons();

        // Gérer la fermeture
        setupCloseHandlers();
        
        // Ajouter le handler Escape (une seule fois)
        addEscapeHandler();

        modalInitialized = true;
        console.log('✅ Modale règles initialisée');
    }

    /* ========================================
       CRÉATION DE LA MODALE
       ======================================== */

    function createModal() {
        // Créer l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'rules-overlay';
        overlay.id = 'rules-overlay';

        // Créer la modale
        const modal = document.createElement('div');
        modal.className = 'rules-modal';

        modal.innerHTML = `
            <button class="rules-close" aria-label="Fermer" type="button">×</button>
            <div class="rules-content">
                <h2 class="rules-title" id="rules-title">Règles du jeu</h2>
                <div class="rules-images-container" id="rules-images-container">
                    <!-- Les images seront injectées dynamiquement -->
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlayElement = overlay;
    }

    /* ========================================
       INTERCEPTION DES BOUTONS
       ======================================== */

    function interceptRulesButtons() {
        // Chercher tous les boutons avec data-action="rules"
        const buttons = document.querySelectorAll('button[data-action="rules"]');
        
        buttons.forEach(button => {
            button.addEventListener('click', handleRulesClick, true);
        });

        // Observer les nouveaux éléments ajoutés dynamiquement
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'BUTTON' && node.getAttribute('data-action') === 'rules') {
                            node.addEventListener('click', handleRulesClick, true);
                        }
                        
                        // Vérifier les descendants
                        const buttons = node.querySelectorAll && node.querySelectorAll('button[data-action="rules"]');
                        if (buttons) {
                            buttons.forEach(btn => {
                                btn.addEventListener('click', handleRulesClick, true);
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /* ========================================
       GESTION DES CLICS
       ======================================== */

    function handleRulesClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const gameId = event.currentTarget.getAttribute('data-game');
        
        if (!gameId || !RULES_CONFIG[gameId]) {
            console.error('Jeu non reconnu:', gameId);
            return;
        }

        // Ouvrir la modale avec le contenu du jeu
        showModal(gameId);

        return false;
    }

    /* ========================================
       AFFICHAGE/FERMETURE DE LA MODALE
       ======================================== */

    function showModal(gameId) {
        if (!overlayElement) {
            createModal();
            // Réattacher les handlers après création
            setupCloseHandlers();
        }

        const config = RULES_CONFIG[gameId];
        if (!config) {
            console.error('Configuration introuvable pour:', gameId);
            return;
        }

        // Mettre à jour le titre
        const titleElement = overlayElement.querySelector('#rules-title');
        if (titleElement) {
            titleElement.textContent = config.title;
        }

        // Mettre à jour les images
        const imagesContainer = overlayElement.querySelector('#rules-images-container');
        if (imagesContainer) {
            // Réinitialiser la classe de layout
            imagesContainer.className = 'rules-images-container ' + config.layout + '-layout';
            
            // Créer les images
            imagesContainer.innerHTML = config.images.map((img, index) => {
                return `
                    <img 
                        src="${img.src}" 
                        alt="${img.alt}" 
                        class="rules-image"
                        onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'rules-image-placeholder\\'>Image à venir<br><small>${img.alt}</small></div>';"
                        loading="lazy"
                    >
                `;
            }).join('');
        }

        // Afficher avec animation
        overlayElement.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            overlayElement.classList.add('active');
        }, 10);
    }

    function closeModal() {
        if (!overlayElement) return;

        overlayElement.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            overlayElement.style.display = 'none';
        }, 300);
    }

    function setupCloseHandlers() {
        if (!overlayElement) return;

        // Utiliser la délégation d'événements pour le bouton de fermeture
        // Cela fonctionne même si le bouton est recréé
        overlayElement.addEventListener('click', function(e) {
            // Vérifier si le clic est sur le bouton de fermeture
            if (e.target.classList.contains('rules-close') || e.target.closest('.rules-close')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                closeModal();
                return false;
            }
            
            // Vérifier si le clic est sur l'overlay (hors de la modale)
            if (e.target === overlayElement) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
                return false;
            }
        }, true); // Utiliser capture phase pour intercepter avant les autres handlers

        // Empêcher la propagation des clics dans la modale elle-même
        const modal = overlayElement.querySelector('.rules-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                // Ne pas empêcher si c'est le bouton de fermeture
                if (!e.target.classList.contains('rules-close') && !e.target.closest('.rules-close')) {
                    e.stopPropagation();
                }
            });
        }
    }

    // Handler Escape global (une seule fois)
    let escapeHandlerAdded = false;
    function addEscapeHandler() {
        if (escapeHandlerAdded) return;
        escapeHandlerAdded = true;
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const activeOverlay = document.querySelector('.rules-overlay.active');
                if (activeOverlay) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal();
                }
            }
        });
    }

    /* ========================================
       DÉMARRAGE
       ======================================== */

    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

