# RAPPORT D'EXPORT PROJET ORA SHEL TORAH
## Structure du Hero et Architecture du Site

**Date:** 2025-01-27  
**Objectif:** Documenter la structure du hero et du projet pour intervention Claude.ai

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble du projet](#vue-densemble)
2. [Structure du Hero Principal (Acte 1)](#hero-principal)
3. [Structure des Hero-Bis (Sections Produits)](#hero-bis)
4. [Styles CSS - Hero](#styles-css)
5. [JavaScript - Fonctionnalités Hero](#javascript)
6. [Points d'attention pour modifications](#points-attention)

---

## 🎯 VUE D'ENSEMBLE DU PROJET

### Architecture générale
- **Type:** Site statique HTML/CSS/JavaScript
- **Déploiement:** Netlify
- **Structure:** Page unique (index.html) avec sections "Actes"
- **Design:** Responsive, mobile-first

### Structure des fichiers principaux
```
/
├── index.html          (2387 lignes - page principale)
├── css/
│   ├── main.css        (styles principaux)
│   ├── responsive.css  (media queries)
│   └── animations.css  (animations)
├── js/
│   ├── main.js         (script principal)
│   ├── modals.js       (gestion modales)
│   ├── cart.js         (panier)
│   └── animations.js   (animations)
└── images/            (assets visuels)
```

### Sections principales (Actes)
1. **Acte 1:** Hero mystérieux (`.hero-dark`)
2. **Acte 2:** Histoire du fondateur
3. **Acte 3:** Philosophie
4. **Acte 4:** Révélation (3 jeux)
5. **Hero-Bis JDC:** Jérusalem du Ciel
6. **Hero-Bis MOH:** Minhag ou Halakha
7. **Hero-Bis POZ:** Poztamitsvah
8. **Acte 6:** Boutique/Produits
9. **Acte 7:** Communauté

---

## 🎬 HERO PRINCIPAL (ACTE 1)

### Structure HTML

**Localisation:** `index.html` lignes 146-199

```html
<section id="acte-1" class="hero-dark">
    <!-- BACKGROUND LAYER -->
    <div class="hero-background">
        <!-- Image de fond -->
        <img src="images/backgrounds/jerusalem_twilight.png" 
             alt="Jérusalem au crépuscule..."
             style="width: 100%; height: 100%; object-fit: cover; 
                    position: absolute; top: 0; left: 0; z-index: 1;">
        
        <!-- Overlay sombre -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; 
                    height: 100%; background: rgba(0,0,0,0.4); z-index: 2;"></div>
        
        <!-- Particules dorées (animation JS) -->
        <div class="particles-container" style="z-index: 3;"></div>
        
        <!-- Lettres hébraïques en filigrane (SVG) -->
        <div class="hebrew-letters" aria-hidden="true" style="z-index: 3;">
            <svg class="letter-aleph">...</svg>
            <svg class="letter-shin">...</svg>
            <svg class="letter-lamed">...</svg>
        </div>
    </div>
    
    <!-- CONTENT LAYER -->
    <div class="hero-content" style="position: relative; z-index: 4;">
        <!-- Logo -->
        <div class="hero-logo">
            <img src="images/logo/logo_large_gold.png" 
                 alt="Logo Ora Shel Torah - De génération en génération">
        </div>
        
        <!-- Titre principal -->
        <h1 class="hero-title">ORA SHEL TORAH</h1>
        
        <!-- Sous-titre -->
        <p class="hero-subtitle">
            Quand la sagesse millénaire<br>
            rencontre le jeu moderne...
        </p>
        
        <!-- Actions (boutons) -->
        <div class="hero-actions">
            <button class="btn-primary" data-scroll-to="acte-2">
                🎬 Découvrir notre univers
            </button>
            <button class="btn-secondary" data-scroll-to="acte-6">
                🛒 Accéder à la boutique
            </button>
        </div>
        
        <!-- Indicateur de scroll -->
        <div class="scroll-indicator">
            <span>↓ Scroll pour entrer ↓</span>
        </div>
    </div>
</section>
```

### Hiérarchie des z-index
1. `z-index: 1` - Image de fond
2. `z-index: 2` - Overlay sombre
3. `z-index: 3` - Particules et lettres hébraïques
4. `z-index: 4` - Contenu (logo, titre, boutons)

### Classes CSS principales
- `.hero-dark` - Container principal
- `.hero-background` - Layer de fond
- `.hero-content` - Layer de contenu
- `.hero-logo` - Container du logo
- `.hero-title` - Titre H1
- `.hero-subtitle` - Sous-titre
- `.hero-actions` - Container des boutons
- `.particles-container` - Container des particules animées
- `.hebrew-letters` - Container des lettres SVG

---

## 🎨 HERO-BIS (SECTIONS PRODUITS)

### Structure générale

Chaque produit (JDC, MOH, POZ) a sa propre section hero-bis avec structure similaire.

**Localisation:** `index.html` lignes 396-787

### Exemple: Hero-Bis JDC

```html
<section id="hero-bis-jdc" class="hero-bis jdc-hero">
    <!-- Background -->
    <div class="hero-bis-background">
        <img src="images/produits/jdc_hero_bg.png" 
             alt="Plateau circulaire du jeu...">
    </div>
    
    <!-- Content -->
    <div class="hero-bis-content">
        <h2>Jérusalem du Ciel 
            <span class="h2-subtitle">— Jeu d'histoire juive familial</span>
        </h2>
        <p class="hero-bis-subtitle">
            Un voyage à travers 3000 ans d'histoire juive
        </p>
        
        <!-- Actions -->
        <div class="hero-bis-actions">
            <button class="btn-modal" data-action="video">🎬 Voir le teaser</button>
            <a href="/demo/" class="btn-modal">🎮 Essayer la démo</a>
            <button class="btn-modal btn-store" data-modal="content-discovery-jdc">
                📦 Découvrir le contenu
            </button>
            <button class="btn-modal btn-store" data-action="store">
                🛒 Commander
            </button>
        </div>
    </div>
    
    <!-- Sections cachées (vidéo, démo, contenu) -->
    <div class="video-section" style="display:none;">...</div>
    <div class="demo-section" style="display:none;">...</div>
    <div class="content-section" style="display:none;">...</div>
</section>
```

### IDs et classes spécifiques
- **JDC:** `id="hero-bis-jdc"` + `class="hero-bis jdc-hero"`
- **MOH:** `id="hero-bis-moh"` + `class="hero-bis moh-hero"`
- **POZ:** `id="hero-bis-poz"` + `class="hero-bis poz-hero"`

### Différences de style entre produits
- **JDC:** `object-fit: contain` (plateau visible)
- **MOH/POZ:** `object-fit: cover` (plein écran)

---

## 💅 STYLES CSS - HERO

### Fichier: `css/main.css`

#### Hero Principal (Acte 1)

```css
.hero-dark {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  padding: 0 var(--space-lg);
}

.hero-logo img {
  width: auto;
  height: 180px;
  max-width: 400px;
  transition: all var(--transition-base);
}

.hero-title {
  font-size: var(--text-6xl);
  color: var(--color-gold);
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
  animation: fadeInUp 2s ease-out 0.3s both;
  font-weight: var(--font-bold);
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: var(--text-xl);
  margin-bottom: var(--space-2xl);
  text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
  animation: fadeInUp 2s ease-out 0.5s both;
}

.hero-actions {
  display: flex;
  gap: var(--space-lg);
  justify-content: center;
  margin-bottom: var(--space-3xl);
  animation: fadeInUp 2s ease-out 1s both;
}
```

#### Hero-Bis

```css
.hero-bis {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bis-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-bis-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Spécifique JDC */
.jdc-hero .hero-bis-background img {
  object-fit: contain;
  object-position: center center;
}

.hero-bis-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  padding: 0 var(--space-lg);
  margin-left: 35%; /* Positionnement à droite */
}

.hero-bis-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md) var(--space-lg);
  max-width: 600px;
  margin: 0 auto;
}
```

### Responsive (mobile)

**Fichier:** `css/responsive.css`

```css
@media (max-width: 768px) {
  .hero-logo img {
    height: 120px;
    max-width: 250px;
  }

  .hero-title {
    font-size: var(--text-4xl);
    letter-spacing: 1px;
  }

  .hero-subtitle {
    font-size: var(--text-lg);
  }

  .hero-actions {
    flex-direction: column;
    gap: var(--space-md);
  }
}
```

---

## ⚙️ JAVASCRIPT - FONCTIONNALITÉS HERO

### Fichier: `js/main.js`

#### Initialisation
```javascript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initSmoothScrolling();
    initHeaderScroll();
    initParticles();
    initBoxAnimations();
    initSectionReveal();
    // ...
}
```

#### Navigation smooth scroll
```javascript
function initSmoothScrolling() {
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
```

#### Particules animées
```javascript
function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 10 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${100 + Math.random() * 20}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(particle);
    }
}
```

#### Révélation des sections
```javascript
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
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-fade-in');
        observer.observe(section);
    });
}
```

---

## ⚠️ POINTS D'ATTENTION POUR MODIFICATIONS

### 1. Structure du Hero Principal

**Éléments critiques:**
- Le hero utilise un système de **z-index en couches** (1→2→3→4)
- L'image de fond est en **position absolute** avec `object-fit: cover`
- L'overlay sombre (`rgba(0,0,0,0.4)`) assure la lisibilité du texte
- Les particules sont générées dynamiquement en JavaScript
- Les lettres hébraïques sont des SVG avec `opacity: 0.03`

**Modifications recommandées:**
- ✅ Modifier le contenu texte (titre, sous-titre) : **Sans risque**
- ✅ Changer l'image de fond : **Sans risque** (mettre à jour le `src` et l'`alt`)
- ⚠️ Modifier les z-index : **Attention** - peut casser l'ordre d'affichage
- ⚠️ Supprimer l'overlay : **Risqué** - texte peut devenir illisible
- ⚠️ Modifier la structure HTML : **Risqué** - vérifier les sélecteurs CSS/JS

### 2. Hero-Bis (Sections Produits)

**Éléments critiques:**
- Chaque hero-bis a un **background image spécifique**
- Le contenu est positionné avec `margin-left: 35%` (desktop)
- Les sections vidéo/démo/contenu sont **cachées par défaut** (`display:none`)
- Les boutons utilisent `data-action` et `data-modal` pour les interactions

**Différences entre produits:**
- **JDC:** `object-fit: contain` (montre le plateau complet)
- **MOH/POZ:** `object-fit: cover` (plein écran)

**Modifications recommandées:**
- ✅ Modifier les textes (titres, sous-titres) : **Sans risque**
- ✅ Changer les images de fond : **Sans risque**
- ⚠️ Modifier `margin-left: 35%` : **Attention** - peut décaler le contenu
- ⚠️ Changer `object-fit` : **Attention** - peut affecter l'affichage de l'image
- ❌ Supprimer les sections cachées : **Risqué** - utilisées par les modales

### 3. Responsive Design

**Breakpoints principaux:**
- Mobile: `max-width: 768px`
- Tablette: `768px - 1023px`
- Desktop: `min-width: 1024px`
- Large: `min-width: 1280px`

**Comportements spécifiques:**
- Sur mobile, les particules sont **désactivées** (`display: none`)
- Les lettres hébraïques sont **masquées** sur mobile
- Les boutons passent en **flex-direction: column** sur mobile
- Le logo est réduit à `120px` sur mobile

### 4. Animations

**Animations CSS utilisées:**
- `fadeInUp` - Apparition progressive des éléments
- `particles` - Animation des particules dorées
- `parallax` - Effet parallaxe sur les lettres hébraïques

**Timing des animations:**
- Logo: `0s` (immédiat)
- Titre: `0.3s` delay
- Sous-titre: `0.5s` delay
- Actions: `1s` delay

### 5. Accessibilité

**Points à respecter:**
- Les lettres hébraïques ont `aria-hidden="true"` (décoratif)
- Les images ont des `alt` descriptifs
- Les boutons ont des labels clairs
- Navigation au clavier fonctionnelle

---

## 🔧 RECOMMANDATIONS POUR CLAUDE.AI

### Pour modifier le Hero Principal

1. **Changer le texte:**
   - Modifier directement dans `index.html` lignes 178-184
   - Vérifier que les styles CSS restent cohérents

2. **Modifier l'image de fond:**
   - Remplacer `images/backgrounds/jerusalem_twilight.png`
   - Mettre à jour l'attribut `alt` pour l'accessibilité

3. **Ajuster les couleurs:**
   - Modifier `var(--color-gold)` dans les variables CSS
   - Ajuster l'overlay `rgba(0,0,0,0.4)` si nécessaire

4. **Changer la disposition:**
   - Modifier `.hero-content` dans `css/main.css`
   - Vérifier le responsive dans `css/responsive.css`

### Pour modifier les Hero-Bis

1. **Uniformiser le style:**
   - Tous les hero-bis doivent avoir la même structure
   - Vérifier les classes spécifiques (`.jdc-hero`, `.moh-hero`, `.poz-hero`)

2. **Ajuster le positionnement:**
   - Modifier `margin-left: 35%` dans `.hero-bis-content`
   - Tester sur différentes tailles d'écran

3. **Gérer les images:**
   - JDC: `object-fit: contain` (garder)
   - MOH/POZ: `object-fit: cover` (garder ou uniformiser)

### Tests à effectuer après modifications

1. ✅ Vérifier l'affichage sur mobile (< 768px)
2. ✅ Vérifier l'affichage sur tablette (768px - 1023px)
3. ✅ Vérifier l'affichage sur desktop (> 1024px)
4. ✅ Tester les animations (particules, fadeIn)
5. ✅ Vérifier la navigation smooth scroll
6. ✅ Tester l'accessibilité (lecteur d'écran, navigation clavier)

---

## 📝 VARIABLES CSS IMPORTANTES

```css
/* Couleurs */
--color-gold: #eda234;
--color-white: #ffffff;
--color-dark-bg: #0a0e1a;

/* Espacements */
--space-lg: 1.5rem;
--space-xl: 2rem;
--space-2xl: 3rem;
--space-3xl: 4rem;

/* Typographie */
--text-xl: 1.25rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
--text-6xl: 4rem;

/* Transitions */
--transition-base: 0.3s ease;
```

---

## 🎯 CONCLUSION

Le hero principal (Acte 1) est une section complexe avec:
- **4 couches de z-index** (fond, overlay, effets, contenu)
- **Animations JavaScript** (particules, parallaxe)
- **Design responsive** (mobile-first)
- **Accessibilité** (alt texts, aria-labels)

Les hero-bis (sections produits) suivent une structure similaire mais avec:
- **Background images spécifiques** par produit
- **Positionnement du contenu à droite** (35% margin-left)
- **Sections cachées** pour modales (vidéo, démo, contenu)

**Pour toute modification, tester systématiquement sur mobile, tablette et desktop.**

---

**Document généré le:** 2025-01-27  
**Version du projet:** 1.0.0  
**Dernière mise à jour:** 2025-01-27

