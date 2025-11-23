/* ========================================
   ORA SHEL TORAH - ANIMATIONS AVANCÉES
   ======================================== */

// ========================================
// ANIMATIONS DES PARTICULES
// ========================================

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: 25,
            minSize: 2,
            maxSize: 6,
            minSpeed: 15,
            maxSpeed: 25,
            minDelay: 0,
            maxDelay: 10,
            color: '#eda234',
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.startAnimation();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${100 + Math.random() * 20}%`;
        
        // Taille aléatoire
        const size = this.options.minSize + Math.random() * (this.options.maxSize - this.options.minSize);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Vitesse aléatoire
        const speed = this.options.minSpeed + Math.random() * (this.options.maxSpeed - this.options.minSpeed);
        particle.style.animationDuration = `${speed}s`;
        
        // Delay aléatoire
        const delay = this.options.minDelay + Math.random() * (this.options.maxDelay - this.options.minDelay);
        particle.style.animationDelay = `${delay}s`;
        
        // Couleur
        particle.style.background = this.options.color;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    startAnimation() {
        // L'animation CSS se charge automatiquement
        // Ici on peut ajouter des interactions supplémentaires
    }
    
    destroy() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
}

// ========================================
// ANIMATIONS DES BOÎTES
// ========================================

class BoxAnimation {
    constructor() {
        this.boxes = document.querySelectorAll('.game-box');
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateBoxes();
                    this.observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        const acte4 = document.getElementById('hero-bis-moh');
        if (acte4) {
            this.observer.observe(acte4);
        }
    }
    
    animateBoxes() {
        this.boxes.forEach((box, index) => {
            const delay = parseInt(box.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                box.classList.add('fall-animation');
                this.addGlowEffect(box);
            }, delay);
        });
    }
    
    addGlowEffect(box) {
        const glow = box.querySelector('.box-glow');
        if (glow) {
            // Animation de pulsation personnalisée
            glow.style.animation = 'glowPulse 4s ease-in-out infinite';
        }
    }
    
    setupHoverEffects() {
        this.boxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                this.onBoxHover(box, true);
            });
            
            box.addEventListener('mouseleave', () => {
                this.onBoxHover(box, false);
            });
        });
    }
    
    onBoxHover(box, isHovering) {
        const img = box.querySelector('img');
        const glow = box.querySelector('.box-glow');
        
        if (isHovering) {
            if (img) {
                img.style.transform = 'scale(1.1) rotate(5deg)';
                img.style.transition = 'transform 0.3s ease';
            }
            if (glow) {
                glow.style.animation = 'glowPulse 2s ease-in-out infinite';
            }
        } else {
            if (img) {
                img.style.transform = 'scale(1) rotate(0deg)';
            }
            if (glow) {
                glow.style.animation = 'glowPulse 4s ease-in-out infinite';
            }
        }
    }
}

// ========================================
// ANIMATIONS DE RÉVÉLATION
// ========================================

class RevealAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.section-fade-in, .reveal');
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.addStaggerEffect();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    revealElement(element) {
        element.classList.add('visible');
        
        // Animation spéciale pour les cartes
        if (element.classList.contains('philosophy-card') || 
            element.classList.contains('product-card') ||
            element.classList.contains('testimonial-card')) {
            this.animateCard(element);
        }
    }
    
    animateCard(card) {
        // Animation de rebond pour les cartes
        card.style.animation = 'bounceIn 0.6s ease-out';
    }
    
    addStaggerEffect() {
        // Ajouter un délai progressif pour les éléments en groupe
        const groups = document.querySelectorAll('.philosophy-grid, .products-grid, .testimonials-grid');
        
        groups.forEach(group => {
            const children = group.children;
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
}

// ========================================
// ANIMATIONS DE PARALLAXE
// ========================================

class ParallaxAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.hebrew-letters, .parallax');
        this.init();
    }
    
    init() {
        this.setupScrollListener();
    }
    
    setupScrollListener() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach(element => {
                const speed = element.dataset.speed || 0.3;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
}

// ========================================
// ANIMATIONS DE CHARGEMENT
// ========================================

class LoadingAnimation {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.createSpinner();
    }
    
    createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        this.element.appendChild(spinner);
    }
    
    hide() {
        const spinner = this.element.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

// ========================================
// ANIMATIONS DE TEXTE
// ========================================

class TextAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            type: 'typewriter',
            speed: 50,
            delay: 1000,
            ...options
        };
        this.init();
    }
    
    init() {
        if (this.options.type === 'typewriter') {
            this.typewriterEffect();
        } else if (this.options.type === 'fadeInUp') {
            this.fadeInUpEffect();
        }
    }
    
    typewriterEffect() {
        const text = this.element.textContent;
        this.element.textContent = '';
        this.element.classList.add('typewriter');
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                this.element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                this.element.classList.remove('typewriter');
            }
        }, this.options.speed);
    }
    
    fadeInUpEffect() {
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(30px)';
        this.element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            this.element.style.opacity = '1';
            this.element.style.transform = 'translateY(0)';
        }, this.options.delay);
    }
}

// ========================================
// ANIMATIONS DE BOUTONS
// ========================================

class ButtonAnimation {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-add-to-cart');
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
    }
    
    setupHoverEffects() {
        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.onHover(button, true);
            });
            
            button.addEventListener('mouseleave', () => {
                this.onHover(button, false);
            });
        });
    }
    
    setupClickEffects() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.onClick(button);
            });
        });
    }
    
    onHover(button, isHovering) {
        if (isHovering) {
            button.style.transform = 'translateY(-2px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        } else {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        }
    }
    
    onClick(button) {
        // Animation de clic
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
}

// ========================================
// GESTIONNAIRE D'ANIMATIONS PRINCIPAL
// ========================================

class AnimationManager {
    constructor() {
        this.animations = [];
        this.init();
    }
    
    init() {
        // Initialiser toutes les animations
        this.initParticleSystem();
        this.initBoxAnimation();
        this.initRevealAnimation();
        this.initParallaxAnimation();
        this.initButtonAnimation();
    }
    
    initParticleSystem() {
        const container = document.querySelector('.particles-container');
        if (container) {
            const particleSystem = new ParticleSystem(container, {
                count: window.innerWidth < 768 ? 10 : 25
            });
            this.animations.push(particleSystem);
        }
    }
    
    initBoxAnimation() {
        const boxAnimation = new BoxAnimation();
        this.animations.push(boxAnimation);
    }
    
    initRevealAnimation() {
        const revealAnimation = new RevealAnimation();
        this.animations.push(revealAnimation);
    }
    
    initParallaxAnimation() {
        const parallaxAnimation = new ParallaxAnimation();
        this.animations.push(parallaxAnimation);
    }
    
    initButtonAnimation() {
        const buttonAnimation = new ButtonAnimation();
        this.animations.push(buttonAnimation);
    }
    
    destroy() {
        this.animations.forEach(animation => {
            if (animation.destroy) {
                animation.destroy();
            }
        });
        this.animations = [];
    }
}

// ========================================
// INITIALISATION
// ========================================

// Initialiser le gestionnaire d'animations au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    window.animationManager = new AnimationManager();
});

// Nettoyer les animations au déchargement de la page
window.addEventListener('beforeunload', function() {
    if (window.animationManager) {
        window.animationManager.destroy();
    }
});

// ========================================
// EXPORT POUR UTILISATION DANS D'AUTRES MODULES
// ========================================

window.AnimationManager = AnimationManager;
window.ParticleSystem = ParticleSystem;
window.BoxAnimation = BoxAnimation;
window.RevealAnimation = RevealAnimation;
window.ParallaxAnimation = ParallaxAnimation;
window.LoadingAnimation = LoadingAnimation;
window.TextAnimation = TextAnimation;
window.ButtonAnimation = ButtonAnimation;
