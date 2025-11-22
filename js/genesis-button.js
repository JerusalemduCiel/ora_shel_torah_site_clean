/**
 * ========================================
 * BOUTON FLOTTANT "D'OÙ ÇA VIENT ?" + MODAL
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
    let targetPosition = { right: 40, top: 50 };
    let currentPosition = { right: 40, top: 50 };

    // Positions par acte (right en px, top en %)
    const actePositions = {
        'acte-1': { right: 40, top: 50 },
        'acte-2': { right: 60, top: 30 },
        'acte-3': { right: 30, top: 60 },
        'acte-4': { right: 50, top: 40 },
        'acte-5': { right: 45, top: 55 }
    };

    /**
     * Détecte l'acte actuel selon la position du scroll
     */
    function detectCurrentActe() {
        const actes = ['acte-1', 'acte-2', 'acte-3', 'acte-4', 'acte-5'];
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
        const acteId = detectCurrentActe();
        console.log('📍 Acte détecté:', acteId, '| Scroll Y:', window.scrollY);

        // Si on est après l'acte 5, faire disparaître progressivement
        if (!acteId || acteId === 'acte-5') {
            const acte5 = document.getElementById('acte-5');
            if (acte5) {
                const rect = acte5.getBoundingClientRect();
                const scrollY = window.scrollY || window.pageYOffset;
                const acte5Bottom = scrollY + rect.top + rect.height;
                const currentScroll = scrollY + window.innerHeight;

                // Si on a dépassé l'acte 5 de plus de 200px, disparaître
                if (currentScroll > acte5Bottom + 200 && floatingBtn) {
                    console.log('👋 Bouton disparaît après acte 5');
                    floatingBtn.style.opacity = '0';
                    floatingBtn.classList.remove('visible');
                    return;
                }
            }
        }

        // Si on est dans l'acte 1, afficher le bouton à sa position initiale
        if (acteId === 'acte-1') {
            targetPosition = actePositions['acte-1'];
            currentActe = 'acte-1';
            console.log('✅ Acte 1 détecté, affichage du bouton');
        }
        // Si on est dans un autre acte, afficher le bouton avec position dynamique
        else if (acteId && acteId !== 'acte-1') {
            const newPosition = calculateTargetPosition(acteId);
            if (newPosition) {
                targetPosition = newPosition;
                currentActe = acteId;
                console.log('✅ Acte', acteId, 'détecté, position:', newPosition);
            }
        }

        // Animer vers la position cible
        if (currentActe && !isModalOpen && floatingBtn) {
            // Interpolation fluide
            const lerp = 0.1; // Facteur de lissage (plus petit = plus fluide)
            currentPosition.right += (targetPosition.right - currentPosition.right) * lerp;
            currentPosition.top += (targetPosition.top - currentPosition.top) * lerp;

            floatingBtn.style.right = currentPosition.right + 'px';
            floatingBtn.style.top = currentPosition.top + '%';
            floatingBtn.style.transform = 'translateY(-50%)';
            floatingBtn.classList.add('visible');
            console.log('👁️ Bouton visible, position:', currentPosition);
        } else if (!currentActe && floatingBtn) {
            floatingBtn.classList.remove('visible');
            console.log('❌ Aucun acte, bouton masqué');
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
        if (isModalOpen || !floatingBtn || !modalOverlay || !closeBtn) return;

        isModalOpen = true;
        floatingBtn.classList.remove('visible');
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Focus trap : focus sur le bouton de fermeture
        closeBtn.focus();

        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';
    }

    /**
     * Ferme la modal
     */
    function closeModal() {
        if (!isModalOpen || !modalOverlay) return;

        isModalOpen = false;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Réactiver le scroll du body
        document.body.style.overflow = '';

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
            // Initialiser les event listeners pour la modal
            floatingBtn.addEventListener('click', openModal);
            closeBtn.addEventListener('click', closeModal);
            
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
            currentPosition = { right: 40, top: 50 };
            floatingBtn.style.right = '40px';
            floatingBtn.style.top = '50%';
            floatingBtn.style.transform = 'translateY(-50%)';
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

    // Exposer les fonctions pour debug si nécessaire
    window.genesisButton = {
        openModal,
        closeModal,
        updatePosition: updateButtonPosition
    };

})();

