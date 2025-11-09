try {
/* ========================================
   ORA SHEL TORAH - SCRIPT PRINCIPAL
   ======================================== */

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialiser les composants
    initSmoothScrolling();
    initHeaderScroll();
    initParticles();
    initBoxAnimations();
    initSectionReveal();
    initPreorderButton();
    initTripleSplitPanels();
    initVideoPhilosophy();
    initPhilosophyMobileNav();
    initContentCarousels();
    initContactPartenariatAnimation();
    initRevelationCards();
    initRevelationMobileCarousel();
    
    console.log('Ora Shel Torah - Site initialisé');
}

// ========================================
// NAVIGATION & SCROLL
// ========================================

function initSmoothScrolling() {
    // Boutons de navigation
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Ajouter/supprimer classe selon la direction du scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scroll vers le bas - cacher le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer le header
            header.style.transform = 'translateY(0)';
        }
        
        // Ajouter classe si on est en haut de page
        if (currentScrollY < 50) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// ========================================
// ANIMATIONS PARTICULES
// ========================================

function initParticles() {
    createParticles();
    initParallax();
}

function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 10 : 25; // Moins de particules sur mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${100 + Math.random() * 20}%`; // Commencer en bas
        
        // Animation delay aléatoire
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        // Taille aléatoire
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        container.appendChild(particle);
    }
}

function initParallax() {
    // Effet parallaxe sur les lettres hébraïques
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hebrewLetters = document.querySelector('.hebrew-letters');
        
        if (hebrewLetters) {
            // Les lettres bougent à 30% de la vitesse du scroll
            hebrewLetters.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ========================================
// ANIMATIONS BOÎTES
// ========================================

function initBoxAnimations() {
    // Observer pour déclencher l'animation des boîtes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const boxes = document.querySelectorAll('.game-box');
                boxes.forEach((box, index) => {
                    const delay = parseInt(box.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        box.classList.add('fall-animation');
                    }, delay);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const acte4 = document.getElementById('acte-4');
    if (acte4) {
        observer.observe(acte4);
    }
}

// ========================================
// RÉVÉLATION DES SECTIONS
// ========================================

function initSectionReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Ajouter la classe reveal aux sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-fade-in');
        observer.observe(section);
    });
}

// ========================================
// ANIMATION SECTION CONTACT/PARTENARIAT
// ========================================

function initContactPartenariatAnimation() {
    const contactSection = document.getElementById('contact-partenariat');
    if (!contactSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Ne plus observer une fois visible
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(contactSection);
}

// ========================================
// BOUTON PRÉCOMMANDE
// ========================================

function initPreorderButton() {
    const preorderBtn = document.getElementById('btn-preorder');
    if (preorderBtn) {
        preorderBtn.addEventListener('click', function() {
            // Scroll vers la section boutique
            const targetSection = document.getElementById('acte-6') || document.getElementById('acte-7');
            if (targetSection) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ========================================
// GESTION DU TRIPLE SPLIT
// ========================================

function initTripleSplitPanels() {
    const panels = document.querySelectorAll('.split-panel');
    
    panels.forEach(panel => {
        panel.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            scrollToHeroBis(target);
        });
    });
}

function scrollToHeroBis(targetId) {
    // Pour l'instant, on scroll vers la section des modales
    // Vous pouvez créer des sections Hero Bis spécifiques si nécessaire
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const headerHeight = document.getElementById('main-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        // Fallback : ouvrir la modale correspondante
        const game = targetId.replace('hero-bis-', '');
        openModal(`modal-${game}`);
    }
}

// ========================================
// GESTION DES VIDÉOS
// ========================================

function initVideoHandling() {
    // Détecter si la vidéo peut être lue
    const video = document.getElementById('video-histoire');
    if (video) {
        video.addEventListener('error', function() {
            // Afficher le fallback si la vidéo ne peut pas être lue
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        
        // Autoplay désactivé - l'utilisateur contrôle la lecture manuellement
    }
}

// ========================================
// UTILITAIRES
// ========================================

// Fonction pour ajouter des classes CSS dynamiquement
function addClass(element, className) {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

// Fonction pour vérifier si un élément est visible
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fonction pour obtenir la position de scroll
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Fonction pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Fonction pour générer un ID unique
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// ========================================
// GESTION DES ERREURS
// ========================================

window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Ici on pourrait envoyer l'erreur à un service de monitoring
});

// ========================================
// PERFORMANCE
// ========================================

// Debounce function pour optimiser les événements de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function pour limiter la fréquence d'exécution
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// INITIALISATION DES COMPOSANTS
// ========================================

// Initialiser la gestion des vidéos
document.addEventListener('DOMContentLoaded', function() {
    initVideoHandling();
    initScrollToTop();
    initVideoPhilosophy();
});

// ========================================
// VIDÉO PHILOSOPHIE
// ========================================

function initVideoPhilosophy() {
    const video = document.getElementById('video-histoire');
    if (!video) return;
    
    // S'assurer que le son est activé
    video.muted = false;
    video.volume = 1.0;
    
    console.log('🎬 Vidéo philosophie : contrôles manuels uniquement');
    
    // Pas d'autoplay, pas de timer, juste les contrôles natifs
}

/* ====================================
   BOUTON RETOUR EN HAUT
   ==================================== */

function initScrollToTop() {
    // Créer le bouton dynamiquement si absent
    let scrollBtn = document.getElementById('scroll-to-top');
    
    if (!scrollBtn) {
        // Créer le bouton
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Retour en haut');
        scrollBtn.innerHTML = '↑';
        
        // Ajouter au body
        document.body.appendChild(scrollBtn);
        console.log('✅ Bouton scroll-to-top créé');
    }
    
    // Afficher/masquer selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll vers le haut au clic
    scrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// NAVIGATION MOBILE SECTION PHILOSOPHIE
// ========================================

function initPhilosophyMobileNav() {
    const container = document.querySelector('.video-philosophy-container');
    if (!container) return;
    
    const nextBtn = document.querySelector('.arrow-next');
    const prevBtn = document.querySelector('.arrow-prev');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            container.setAttribute('data-mobile-slide', '1');
            console.log('→ Slide vers texte fondateur');
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            container.setAttribute('data-mobile-slide', '0');
            console.log('← Retour vers vidéo');
        });
    }
    
    console.log('✅ Navigation mobile philosophie initialisée');
}

// ========================================
// CAROUSEL GALERIE CONTENT SECTIONS
// ========================================

function initContentCarousels() {
    console.log('🎬 Initialisation des carousels');
    
    // ⭐ NETTOYER tous les event listeners problématiques sur TOUTES les images (JDC, MOH, POZ)
    document.querySelectorAll('.carousel-item img, .carousel-item video').forEach(media => {
        const newMedia = media.cloneNode(true);
        if (media.parentNode) {
            media.parentNode.replaceChild(newMedia, media);
        }
        newMedia.style.cursor = 'default';
    });
    
    document.querySelectorAll('.gallery-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        const caption = carousel.querySelector('.carousel-caption p');
        
        if (!slides.length) return;
        
        let currentSlide = 0;
        
        function goToSlide(index) {
            // Masquer tous les slides et gérer les vidéos
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                // Mettre en pause et réinitialiser les vidéos inactives
                const video = slide.querySelector('video');
                if (video && i !== index) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Afficher le slide demandé
            const activeSlide = slides[index];
            activeSlide.classList.add('active');
            indicators[index].classList.add('active');
            
            // Charger la vidéo si elle existe dans le slide actif
            const activeVideo = activeSlide.querySelector('video.carousel-video');
            if (activeVideo) {
                activeVideo.load();
            }
            
            // Mettre à jour le caption
            if (caption) {
                caption.textContent = `Image ${index + 1} sur ${slides.length}`;
            }
            
            currentSlide = index;
        }
        
        // Bouton précédent
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentSlide - 1 + slides.length) % slides.length;
                goToSlide(newIndex);
            });
        }
        
        // Bouton suivant
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentSlide + 1) % slides.length;
                goToSlide(newIndex);
            });
        }
        
        // Indicateurs cliquables
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(index);
            });
        });
        
        // ❌ PAS de clic sur images pour agrandissement
        
        carousel.carouselInstance = {
            goToSlide: goToSlide,
            currentSlide: () => currentSlide,
            totalSlides: slides.length
        };
        
        // Initialiser : charger la vidéo si le slide actif en contient une
        const activeSlide = slides[currentSlide];
        if (activeSlide) {
            const activeVideo = activeSlide.querySelector('video.carousel-video');
            if (activeVideo) {
                activeVideo.load();
            }
        }
        
        console.log('✅ Carousel initialisé:', slides.length, 'slides');
    });
}

/* ========================================
   MODE PLEIN ÉCRAN - VERSION CORRIGÉE
   ======================================== */

function openFullscreen(carousel, slides, startIndex) {
    console.log('🎬 Tentative ouverture plein écran, index:', startIndex);
    
    const overlay = document.getElementById('fullscreen-overlay');
    const container = document.getElementById('fullscreen-container');
    const closeBtn = document.getElementById('fullscreen-close');
    const prevBtn = document.getElementById('fullscreen-prev');
    const nextBtn = document.getElementById('fullscreen-next');
    const indicatorsContainer = document.getElementById('fullscreen-indicators');
    const caption = document.getElementById('fullscreen-caption');
    
    // Vérifications critiques
    if (!overlay) {
        console.error('❌ fullscreen-overlay introuvable !');
        return;
    }
    if (!container) {
        console.error('❌ fullscreen-container introuvable !');
        return;
    }
    if (!closeBtn || !prevBtn || !nextBtn) {
        console.error('❌ Boutons de navigation introuvables !');
        return;
    }
    
    console.log('✅ Tous les éléments plein écran trouvés');
    
    let currentIndex = startIndex;
    
    function showFullscreenSlide(index) {
        console.log('📺 Affichage slide plein écran:', index);
        const slide = slides[index];
        const media = slide.querySelector('img, video');
        
        if (!media) {
            console.error('❌ Média introuvable dans slide', index);
            return;
        }
        
        // Cloner le média
        const clone = media.cloneNode(true);
        clone.className = 'fullscreen-content';
        
        if (clone.tagName === 'VIDEO') {
            clone.controls = true;
            clone.style.maxWidth = '100%';
            clone.style.maxHeight = '90vh';
        }
        
        // Vider et remplir le container
        container.innerHTML = '';
        container.appendChild(clone);
        
        // Mettre à jour la caption
        if (caption) {
            caption.textContent = `Image ${index + 1} sur ${slides.length}`;
        }
        
        // Mettre à jour les indicateurs
        document.querySelectorAll('.fullscreen-indicator').forEach((ind, i) => {
            if (i === index) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
        
        currentIndex = index;
        console.log('✅ Slide affiché en plein écran');
    }
    
    // Créer les indicateurs
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'fullscreen-indicator';
            if (index === startIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                showFullscreenSlide(index);
                if (carousel.carouselInstance) {
                    carousel.carouselInstance.goToSlide(index);
                }
            });
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Handlers de navigation
    const prevHandler = () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showFullscreenSlide(newIndex);
        if (carousel.carouselInstance) {
            carousel.carouselInstance.goToSlide(newIndex);
        }
    };
    
    const nextHandler = () => {
        const newIndex = (currentIndex + 1) % slides.length;
        showFullscreenSlide(newIndex);
        if (carousel.carouselInstance) {
            carousel.carouselInstance.goToSlide(newIndex);
        }
    };
    
    // Nettoyer les anciens listeners (important !)
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    // Ajouter les nouveaux listeners
    newPrevBtn.addEventListener('click', prevHandler);
    newNextBtn.addEventListener('click', nextHandler);
    
    // Fonction de fermeture
    function closeFullscreen() {
        console.log('🚪 Fermeture plein écran');
        overlay.style.display = 'none';
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Arrêter les vidéos
        container.querySelectorAll('video').forEach(v => {
            v.pause();
            v.currentTime = 0;
        });
        
        // Retirer le listener clavier
        document.removeEventListener('keydown', handleKeys);
    }
    
    // Bouton fermer
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    newCloseBtn.addEventListener('click', closeFullscreen);
    
    // Clic sur overlay (en dehors du container)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeFullscreen();
        }
    });
    
    // Navigation clavier
    function handleKeys(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft') {
            prevHandler();
        } else if (e.key === 'ArrowRight') {
            nextHandler();
        }
    }
    document.addEventListener('keydown', handleKeys);
    
    // Afficher l'overlay
    overlay.style.display = 'flex';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Afficher le premier slide
    showFullscreenSlide(startIndex);
    
    console.log('✅ Plein écran activé avec succès');
}

// ========================================
// EXPORT POUR UTILISATION DANS D'AUTRES MODULES
// ========================================

window.OraShelTorah = {
    addClass,
    removeClass,
    isElementVisible,
    getScrollPosition,
    formatPrice,
    generateId,
    debounce,
    throttle
};

let revelationCarouselState = {
    initialized: false
};

function teardownRevelationMobileCarousel() {
    if (!revelationCarouselState.initialized) {
        return;
    }

    const {
        prevBtn,
        nextBtn,
        prevHandler,
        nextHandler,
        dotHandlers,
        wrapper,
        touchStartHandler,
        touchEndHandler,
        cards,
        dots
    } = revelationCarouselState;

    if (prevBtn && prevHandler) {
        prevBtn.removeEventListener('click', prevHandler);
    }

    if (nextBtn && nextHandler) {
        nextBtn.removeEventListener('click', nextHandler);
    }

    if (dotHandlers && dotHandlers.length) {
        dotHandlers.forEach(({ dot, handler }) => {
            if (dot && handler) {
                dot.removeEventListener('click', handler);
            }
        });
    }

    if (wrapper && touchStartHandler) {
        wrapper.removeEventListener('touchstart', touchStartHandler);
    }

    if (wrapper && touchEndHandler) {
        wrapper.removeEventListener('touchend', touchEndHandler);
    }

    if (cards && cards.length) {
        cards.forEach(card => {
            card.classList.remove('active', 'prev-card', 'next-card', 'hidden');
            card.style.removeProperty('--revelation-card-state');
        });
    }

    if (dots && dots.length) {
        dots.forEach(dot => dot.classList.remove('is-active'));
    }

    if (typeof window.updateCardsPosition === 'function') {
        window.updateCardsPosition = undefined;
    }

    revelationCarouselState = {
        initialized: false
    };
}

function initRevelationMobileCarousel() {
    const MOBILE_BREAKPOINT = 768;
    const wrapper = document.querySelector('.revelation-boxes-wrapper');

    if (!wrapper) {
        teardownRevelationMobileCarousel();
        return;
    }

    if (window.innerWidth >= MOBILE_BREAKPOINT) {
        teardownRevelationMobileCarousel();
        return;
    }

    const cards = Array.from(wrapper.querySelectorAll('.revelation-card'));
    if (!cards.length) {
        teardownRevelationMobileCarousel();
        return;
    }

    const prevBtn = document.getElementById('revelation-prev');
    const nextBtn = document.getElementById('revelation-next');
    const dots = Array.from(document.querySelectorAll('.revelation-dot'));
    const usableDots = dots.slice(0, cards.length);
    const dynamicTitle = document.getElementById('game-title-dynamic');

    const GAMES_DATA = cards.map((card, index) => ({
        index,
        id: card.dataset.game || `revelation-${index}`,
        title: card.dataset.title || card.textContent.trim(),
        element: card
    }));

    if (revelationCarouselState.initialized) {
        teardownRevelationMobileCarousel();
    }

    let currentIndex = 0;

    const applyCardState = (card, state) => {
        card.classList.remove('active', 'prev-card', 'next-card', 'hidden');
        if (state) {
            card.classList.add(state);
        }
    };

    const syncDynamicTitle = (index) => {
        if (!dynamicTitle) {
            return;
        }
        const game = GAMES_DATA[index];
        if (game && game.title) {
            dynamicTitle.textContent = game.title;
        }
    };

    const updateCardsPosition = (targetIndex) => {
        if (!cards.length) {
            return;
        }

        const normalizedIndex = ((targetIndex % cards.length) + cards.length) % cards.length;
        const prevIndex = (normalizedIndex - 1 + cards.length) % cards.length;
        const nextIndex = (normalizedIndex + 1) % cards.length;

        cards.forEach((card, cardIndex) => {
            if (cardIndex === normalizedIndex) {
                applyCardState(card, 'active');
            } else if (cardIndex === prevIndex) {
                applyCardState(card, 'prev-card');
            } else if (cardIndex === nextIndex) {
                applyCardState(card, 'next-card');
            } else {
                applyCardState(card, 'hidden');
            }
        });

        usableDots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === normalizedIndex);
        });

        syncDynamicTitle(normalizedIndex);
        currentIndex = normalizedIndex;
        revelationCarouselState.currentIndex = currentIndex;
    };

    const prevHandler = () => {
        updateCardsPosition(currentIndex - 1);
    };

    const nextHandler = () => {
        updateCardsPosition(currentIndex + 1);
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', prevHandler);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextHandler);
    }

    const dotHandlers = [];
    usableDots.forEach((dot, index) => {
        const handler = () => updateCardsPosition(index);
        dot.addEventListener('click', handler);
        dotHandlers.push({ dot, handler });
    });

    let touchStartX = 0;

    const touchStartHandler = (event) => {
        if (!event.touches.length) {
            return;
        }
        touchStartX = event.touches[0].clientX;
    };

    const touchEndHandler = (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) {
            return;
        }

        const diff = touchStartX - touch.clientX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextHandler();
            } else {
                prevHandler();
            }
        }
    };

    wrapper.addEventListener('touchstart', touchStartHandler, { passive: true });
    wrapper.addEventListener('touchend', touchEndHandler);

    updateCardsPosition(0);

    window.updateCardsPosition = (index) => {
        if (typeof index === 'number' && !Number.isNaN(index)) {
            updateCardsPosition(index);
        }
    };

    revelationCarouselState = {
        initialized: true,
        prevBtn,
        nextBtn,
        prevHandler,
        nextHandler,
        dotHandlers,
        wrapper,
        touchStartHandler,
        touchEndHandler,
        cards,
        dots: usableDots,
        currentIndex: 0,
        dynamicTitle,
        games: GAMES_DATA,
        updateCardsPosition
    };
}

function initRevelationCards() {
    const cards = document.querySelectorAll('.revelation-card');
    if (!cards.length) {
        return;
    }

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.defaultPrevented) {
                return;
            }

            // Conserver les comportements natifs (nouvel onglet, etc.)
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                return;
            }

            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (!targetElement) {
                return;
            }

            e.preventDefault();

            const header = document.getElementById('main-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (history.replaceState) {
                history.replaceState(null, '', href);
            } else {
                window.location.hash = targetId;
            }
        });

        card.addEventListener('focus', () => toggleRevelationCardAnimation(card, true));
        card.addEventListener('blur', () => toggleRevelationCardAnimation(card, false));
        card.addEventListener('mouseenter', () => toggleRevelationCardAnimation(card, true));
        card.addEventListener('mouseleave', () => toggleRevelationCardAnimation(card, false));
    });
}

function toggleRevelationCardAnimation(card, shouldPause) {
    const icon = card.querySelector('.revelation-icon');
    const shadow = card.querySelector('.revelation-shadow');
    const state = shouldPause ? 'paused' : '';

    if (icon) {
        icon.style.animationPlayState = state;
        if (!shouldPause) {
            icon.style.transform = '';
        }
    }

    if (shadow) {
        shadow.style.animationPlayState = state;
    }
}

const handleRevelationResize = debounce(() => {
    initRevelationMobileCarousel();
}, 150);

window.addEventListener('resize', handleRevelationResize);

} catch(e) {
    alert('ERREUR main.js : ' + e.message);
}
