/**
 * ========================================
 * BOUTON FLOTTANT "À L'ORIGINE" + MODAL
 * ========================================
 * 
 * Gère :
 * - Affichage/masquage du bouton selon le scroll
 * - Position dynamique du bouton selon l'acte
 * - Animation de déplacement fluide
 * - Ouverture/fermeture de la modal
 * - Accessibilité (Escape, focus trap)
 */

(function() {
    'use strict';

    // Variables globales pour les éléments DOM
    let floatingBtn = null;
    let modalOverlay = null;
    let modal = null;
    let closeBtn = null;

    // État
    let currentActe = null;
    let isModalOpen = false;
    let rafId = null;
    let targetPosition = { right: 120, top: 50 }; // Décalé de 80px vers l'intérieur
    let currentPosition = { right: 120, top: 50 };
    let savedScrollPosition = 0; // Sauvegarder la position de scroll

    // Positions par acte (right en px, top en %)
    // Toutes les positions sont décalées de 80px vers l'intérieur pour éviter les flèches du carousel
    const actePositions = {
        'acte-1': { right: 120, top: 50 },
        'acte-2': { right: 140, top: 30 },
        'hero-bis-jdc': { right: 110, top: 60 },
        'hero-bis-moh': { right: 130, top: 40 },
        'hero-bis-poz': { right: 125, top: 55 }
    };

    /**
     * Détecte l'acte actuel selon la position du scroll
     */
    function detectCurrentActe() {
        const actes = ['acte-1', 'acte-2', 'hero-bis-jdc', 'hero-bis-moh', 'hero-bis-poz'];
        const scrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const viewportMiddle = scrollY + windowHeight / 2;

        // Chercher l'acte le plus proche du milieu de l'écran
        let closestActe = null;
        let closestDistance = Infinity;

        actes.forEach(acteId => {
            const element = document.getElementById(acteId);
            if (!element) {
                console.warn(`⚠️ Acte ${acteId} non trouvé dans le DOM`);
                return;
            }

            const rect = element.getBoundingClientRect();
            const elementTop = scrollY + rect.top;
            const elementBottom = elementTop + rect.height;
            const elementMiddle = elementTop + rect.height / 2;

            // Si l'acte est visible dans le viewport
            if (elementTop <= scrollY + windowHeight && elementBottom >= scrollY) {
                const distance = Math.abs(viewportMiddle - elementMiddle);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestActe = acteId;
                }
            }
        });

        // Si aucun acte détecté mais qu'on est en haut de page, considérer acte-1
        if (!closestActe && scrollY < 500) {
            const acte1 = document.getElementById('acte-1');
            if (acte1) {
                closestActe = 'acte-1';
            }
        }

        return closestActe;
    }

    /**
     * Calcule la position cible avec un léger wobble aléatoire
     */
    function calculateTargetPosition(acteId) {
        const basePosition = actePositions[acteId];
        if (!basePosition) return null;

        // Ajouter un léger mouvement aléatoire (±3px pour right, ±2% pour top)
        const wobbleRight = (Math.random() - 0.5) * 6;
        const wobbleTop = (Math.random() - 0.5) * 4;

        return {
            right: basePosition.right + wobbleRight,
            top: basePosition.top + wobbleTop
        };
    }

    /**
     * Met à jour la position du bouton avec animation fluide
     */
    function updateButtonPosition() {
        let acteId = detectCurrentActe();
        console.log('📍 Acte détecté:', acteId, '| Scroll Y:', window.scrollY);

        // Si aucun acte détecté, vérifier si on est après l'acte 5
        if (!acteId) {
            const acte5 = document.getElementById('hero-bis-poz');
            const acte6 = document.getElementById('acte-6');
            
            if (acte5 && acte6) {
                const scrollY = window.scrollY || window.pageYOffset;
                const acte5Rect = acte5.getBoundingClientRect();
                const acte6Rect = acte6.getBoundingClientRect();
                const acte5Bottom = scrollY + acte5Rect.top + acte5Rect.height;
                const acte6Top = scrollY + acte6Rect.top;
                const currentScroll = scrollY + window.innerHeight;

                // Si on est clairement dans l'acte 6 ou après, cacher le bouton
                if (currentScroll > acte6Top + 100) {
                    console.log('👋 Bouton caché : après l\'acte 6');
                    if (floatingBtn) {
                        floatingBtn.style.opacity = '0';
                        floatingBtn.style.pointerEvents = 'none';
                        floatingBtn.classList.remove('visible');
                    }
                    currentActe = null;
                    return;
                }
                // Si on est entre l'acte 5 et l'acte 6, considérer qu'on est encore dans l'acte 5
                else if (currentScroll > acte5Bottom - 200) {
                    acteId = 'hero-bis-poz';
                    console.log('📍 Zone de transition, considéré comme acte 5');
                }
            }
        }

        // Extraire le numéro de l'acte pour déterminer la visibilité
        let actNumber = null;
        if (acteId) {
            const match = acteId.match(/acte-(\d+)/);
            if (match) {
                actNumber = parseInt(match[1], 10);
            } else if (acteId.startsWith('hero-bis-')) {
                // Les hero-bis sont considérés comme actes 3, 4, 5
                if (acteId === 'hero-bis-jdc') actNumber = 3;
                else if (acteId === 'hero-bis-moh') actNumber = 4;
                else if (acteId === 'hero-bis-poz') actNumber = 5;
            }
        }

        // LOGIQUE DE VISIBILITÉ : Actes 1-5 = visible, Acte 6+ = caché
        if (actNumber && actNumber >= 1 && actNumber <= 5) {
            // Actes 1-5 : AFFICHER le bouton
            if (acteId === 'acte-1') {
                targetPosition = actePositions['acte-1'];
                currentActe = 'acte-1';
                console.log('✅ Acte 1 détecté, affichage du bouton');
            } else if (acteId && actePositions[acteId]) {
                const newPosition = calculateTargetPosition(acteId);
                if (newPosition) {
                    targetPosition = newPosition;
                    currentActe = acteId;
                    console.log('✅ Acte', acteId, 'détecté, position:', newPosition);
                }
            }

            // Animer vers la position cible et AFFICHER le bouton
            if (currentActe && !isModalOpen && floatingBtn) {
                // Interpolation fluide
                const lerp = 0.1; // Facteur de lissage (plus petit = plus fluide)
                currentPosition.right += (targetPosition.right - currentPosition.right) * lerp;
                currentPosition.top += (targetPosition.top - currentPosition.top) * lerp;

                // Appliquer position (le transform de base est géré par le CSS pour l'animation)
                floatingBtn.style.right = currentPosition.right + 'px';
                floatingBtn.style.top = currentPosition.top + '%';
                // Ne pas écraser le transform pour permettre l'animation CSS
                // Le transform translateY(-50%) est géré par le CSS
                floatingBtn.style.opacity = '1';
                floatingBtn.style.pointerEvents = 'auto';
                floatingBtn.classList.add('visible');
                console.log('👁️ Bouton visible, position:', currentPosition);
            }
        } else {
            // Acte 6 ou plus, ou aucun acte détecté : CACHER le bouton
            if (floatingBtn) {
                console.log('❌ Acte', actNumber || 'inconnu', '- Bouton masqué');
                floatingBtn.style.opacity = '0';
                floatingBtn.style.pointerEvents = 'none';
                floatingBtn.classList.remove('visible');
                currentActe = null;
            }
        }
    }

    /**
     * Gère le scroll avec requestAnimationFrame pour performance
     */
    function handleScroll() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
            updateButtonPosition();
            rafId = null;
        });
    }

    /**
     * Ouvre la modal
     */
    function openModal() {
        console.log('🔍 openModal appelée');
        
        if (isModalOpen || !floatingBtn || !modalOverlay || !closeBtn) {
            console.log('❌ Conditions non remplies:', { isModalOpen, floatingBtn, modalOverlay, closeBtn });
            return;
        }

        // Sauvegarder la position de scroll actuelle
        savedScrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        console.log('📍 Position scroll sauvegardée:', savedScrollPosition);

        isModalOpen = true;
        floatingBtn.classList.remove('visible');
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        
        // Ajouter classe au body ET html pour bloquer le scroll
        document.body.classList.add('modal-open', 'no-scroll');
        document.documentElement.classList.add('modal-open', 'no-scroll');
        
        // FORCER le blocage du scroll du body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // VÉRIFIER que les styles sont appliqués
        console.log('✅ Body styles après:', {
            position: document.body.style.position,
            overflow: document.body.style.overflow,
            top: document.body.style.top,
            width: document.body.style.width
        });
        console.log('✅ Body computed overflow:', window.getComputedStyle(document.body).overflow);
        console.log('✅ Body computed position:', window.getComputedStyle(document.body).position);
        console.log('✅ HTML computed overflow:', window.getComputedStyle(document.documentElement).overflow);
        console.log('✅ Body classes:', document.body.className);
        console.log('✅ HTML classes:', document.documentElement.className);

        // Focus trap : focus sur le bouton de fermeture
        closeBtn.focus();
    }

    /**
     * Ferme la modal
     */
    function closeModal() {
        console.log('🔍 closeModal appelée');
        
        if (!isModalOpen || !modalOverlay) {
            console.log('❌ Conditions non remplies:', { isModalOpen, modalOverlay });
            return;
        }

        isModalOpen = false;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        
        // Retirer classes
        document.body.classList.remove('modal-open', 'no-scroll');
        document.documentElement.classList.remove('modal-open', 'no-scroll');
        
        // RESTAURER le scroll du body
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        // Restaurer la position de scroll
        const scrollPosition = scrollY ? parseInt(scrollY.replace('-', '').replace('px', '')) : savedScrollPosition;
        window.scrollTo(0, scrollPosition);
        console.log('📍 Position scroll restaurée:', scrollPosition);

        // Réafficher le bouton après un court délai
        setTimeout(() => {
            if (!isModalOpen && floatingBtn) {
                updateButtonPosition();
            }
        }, 300);
    }

    /**
     * Gère le focus trap dans la modal
     */
    function handleFocusTrap(e) {
        if (!isModalOpen) return;

        const focusableElements = modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    // Les event listeners seront ajoutés dans initButton() après vérification des éléments

    /**
     * Initialise le bouton flottant
     */
    function initButton() {
        console.log('🚀 Initialisation du bouton flottant');
        console.log('📄 État du DOM:', document.readyState);
        console.log('📏 Scroll Y:', window.scrollY);
        
        // Récupérer les éléments DOM
        floatingBtn = document.getElementById('floating-genesis-btn');
        modalOverlay = document.getElementById('genesis-modal-overlay');
        modal = document.querySelector('.genesis-modal');
        closeBtn = document.querySelector('.genesis-modal-close');
        
        // Debug : vérifier les éléments
        console.log('🔍 Debug bouton flottant:');
        console.log('- floatingBtn:', floatingBtn);
        console.log('- modalOverlay:', modalOverlay);
        console.log('- modal:', modal);
        console.log('- closeBtn:', closeBtn);
        
        // Vérifier que le bouton existe
        if (!floatingBtn) {
            console.error('❌ Bouton flottant non trouvé dans le DOM');
            console.error('💡 Vérifiez que le bouton HTML est présent avant ce script');
            return;
        }
        
        console.log('✅ Bouton trouvé, initialisation...');
        
        // Vérifier les éléments de la modal
        if (!modalOverlay || !modal || !closeBtn) {
            console.warn('⚠️ Éléments de la modal non trouvés, le bouton fonctionnera mais pas la modal');
        } else {
            // Fonction utilitaire pour handlers tactiles
            // Nettoie les anciens listeners pour éviter les duplications
            function addMobileButtonHandler(element, handler, options = {}) {
                if (!element || typeof handler !== 'function') {
                    return;
                }
                const { passive = false, once = false } = options;
                
                // Stocker les handlers pour pouvoir les retirer plus tard
                if (!element._mobileHandlers) {
                    element._mobileHandlers = {
                        touchstart: null,
                        click: null
                    };
                }
                
                // Retirer les anciens listeners s'ils existent
                if (element._mobileHandlers.touchstart) {
                    element.removeEventListener('touchstart', element._mobileHandlers.touchstart);
                }
                if (element._mobileHandlers.click) {
                    element.removeEventListener('click', element._mobileHandlers.click);
                }
                
                // Créer les nouveaux handlers
                const touchHandler = function(e) {
                    e.preventDefault();
                    handler.call(this, e);
                };
                
                const clickHandler = function(e) {
                    if (e.pointerType === 'mouse' || e.detail === 0) {
                        handler.call(this, e);
                    }
                };
                
                // Stocker les handlers
                element._mobileHandlers.touchstart = touchHandler;
                element._mobileHandlers.click = clickHandler;
                
                // Ajouter les nouveaux listeners
                element.addEventListener('touchstart', touchHandler, { passive: passive, once: once });
                element.addEventListener('click', clickHandler, { once: once });
            }
            
            // Initialiser les event listeners pour la modal (support tactile)
            addMobileButtonHandler(floatingBtn, openModal);
            addMobileButtonHandler(closeBtn, closeModal);
            
            // Fermeture en cliquant sur l'overlay
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        }
        
        // Forcer l'affichage si on est en haut de page (acte 1)
        if (window.scrollY < 100) {
            console.log('📍 En haut de page, affichage forcé du bouton');
            currentActe = 'acte-1';
            targetPosition = actePositions['acte-1'];
            currentPosition = { right: 120, top: 50 }; // Position mise à jour
            floatingBtn.style.right = '120px';
            floatingBtn.style.top = '50%';
            // Le transform translateY(-50%) est géré par le CSS pour permettre l'animation
            floatingBtn.classList.add('visible');
            console.log('✅ Bouton affiché');
        } else {
            updateButtonPosition();
        }
        
        // Gestion du scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                handleScroll();
            }, 10);
        }, { passive: true });
        
        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
            handleFocusTrap(e);
        });
    }

    // Attendre que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📋 DOMContentLoaded, initialisation du bouton');
            setTimeout(initButton, 100); // petit délai de sécurité
        });
    } else {
        // DOM déjà chargé, initialiser immédiatement avec un délai de sécurité
        console.log('⚡ DOM déjà chargé, initialisation immédiate');
        setTimeout(initButton, 100);
    }
    
    // Backup : initialisation au chargement complet de la page
    window.addEventListener('load', () => {
        console.log('✅ Page chargée, vérification du bouton');
        if (!floatingBtn) {
            console.warn('⚠️ Bouton non initialisé, nouvelle tentative...');
            setTimeout(initButton, 100);
        }
    });

    /**
     * Scroll vers la vidéo dans la modale
     */
    function scrollToVideoInModal() {
        if (!modalOverlay || !modal) return;
        
        setTimeout(() => {
            const videoSection = document.querySelector('.modal-video-section');
            
            if (modal && videoSection) {
                // Le scroll se fait sur .genesis-modal qui a overflow-y: auto
                const modalRect = modal.getBoundingClientRect();
                const videoRect = videoSection.getBoundingClientRect();
                
                // Calculer la position relative au modal
                const offset = videoRect.top - modalRect.top + modal.scrollTop;
                
                // Scroller dans la modale
                modal.scrollTo({ 
                    top: offset - 20, // -20px pour un peu d'espace
                    behavior: 'smooth' 
                });
            }
        }, 300); // Attendre que la modale soit ouverte
    }

    // Exposer les fonctions pour debug si nécessaire
    window.genesisButton = {
        openModal,
        closeModal,
        updatePosition: updateButtonPosition,
        scrollToVideo: scrollToVideoInModal
    };

})();

/**
 * ========================================
 * GESTION DES LIENS DE NAVIGATION VERS LA MODALE
 * ========================================
 */
(function() {
    'use strict';

    // Fonction d'initialisation
    function initNavigationLinks() {
        // Récupérer les éléments
        const navHistoire = document.getElementById('nav-histoire');
        const navPhilosophie = document.getElementById('nav-philosophie');
        const navHistoireMobile = document.getElementById('nav-histoire-mobile');
        const navPhilosophieMobile = document.getElementById('nav-philosophie-mobile');
        
        // Fonction pour ouvrir la modale
        function openModalFromNav() {
            if (window.genesisButton && window.genesisButton.openModal) {
                window.genesisButton.openModal();
            } else {
                // Fallback si genesisButton n'est pas encore chargé
                const modalOverlay = document.getElementById('genesis-modal-overlay');
                if (modalOverlay) {
                    // Sauvegarder la position de scroll
                    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                    
                    modalOverlay.classList.add('active');
                    
                    // FORCER le blocage du scroll du body
                    document.body.classList.add('modal-open', 'no-scroll');
                    document.documentElement.classList.add('modal-open', 'no-scroll');
                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${scrollY}px`;
                    document.body.style.width = '100%';
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                }
            }
        }
        
        // Fonction pour ouvrir la modale et scroller vers la vidéo
        function openModalAndScrollToVideo() {
            openModalFromNav();
            // Attendre un peu plus pour que la modale soit complètement ouverte
            setTimeout(() => {
                if (window.genesisButton && window.genesisButton.scrollToVideo) {
                    window.genesisButton.scrollToVideo();
                } else {
                    // Fallback
                    const modal = document.querySelector('.genesis-modal');
                    const videoSection = document.querySelector('.modal-video-section');
                    if (modal && videoSection) {
                        const modalRect = modal.getBoundingClientRect();
                        const videoRect = videoSection.getBoundingClientRect();
                        const offset = videoRect.top - modalRect.top + modal.scrollTop;
                        modal.scrollTo({ 
                            top: offset - 20, 
                            behavior: 'smooth' 
                        });
                    }
                }
            }, 350);
        }
        
        // Lien "Notre histoire" (desktop) → ouvre la modale
        if (navHistoire) {
            navHistoire.addEventListener('click', function(e) {
                e.preventDefault();
                openModalFromNav();
            });
        }
        
        // Lien "Philosophie" (desktop) → ouvre la modale + scroll vers vidéo
        if (navPhilosophie) {
            navPhilosophie.addEventListener('click', function(e) {
                e.preventDefault();
                openModalAndScrollToVideo();
            });
        }
        
        // Lien "Notre histoire" (mobile) → ouvre la modale
        if (navHistoireMobile) {
            navHistoireMobile.addEventListener('click', function(e) {
                e.preventDefault();
                openModalFromNav();
                // Fermer le menu mobile si ouvert
                const mobileNav = document.getElementById('mobile-nav');
                const burgerMenu = document.getElementById('burger-menu');
                if (mobileNav && burgerMenu) {
                    mobileNav.classList.remove('active');
                    burgerMenu.classList.remove('active');
                }
            });
        }
        
        // Lien "Philosophie" (mobile) → ouvre la modale + scroll vers vidéo
        if (navPhilosophieMobile) {
            navPhilosophieMobile.addEventListener('click', function(e) {
                e.preventDefault();
                openModalAndScrollToVideo();
                // Fermer le menu mobile si ouvert
                const mobileNav = document.getElementById('mobile-nav');
                const burgerMenu = document.getElementById('burger-menu');
                if (mobileNav && burgerMenu) {
                    mobileNav.classList.remove('active');
                    burgerMenu.classList.remove('active');
                }
            });
        }
    }

    // Initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigationLinks);
    } else {
        // DOM déjà chargé
        setTimeout(initNavigationLinks, 100);
    }
    
    // Backup : réessayer après le chargement complet
    window.addEventListener('load', () => {
        setTimeout(initNavigationLinks, 200);
    });

})();

