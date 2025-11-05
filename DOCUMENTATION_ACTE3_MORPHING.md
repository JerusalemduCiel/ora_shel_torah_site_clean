# Documentation - Animations de Morphing Acte 3 (Révélation Trilogie)

## 📋 Vue d'ensemble

Cette documentation décrit la structure et le fonctionnement des **3 animations de morphing** qui présentent les jeux JDC (Jérusalem du Ciel), MOH (Maître de la Halakha) et POZ (Pratique au Quotidien). Ces animations se trouvent dans la section **`#revelation-trilogie`** (également appelée "Acte 4" dans la structure narrative du site).

---

## 🎯 Structure HTML

### Section principale
```html
<section id="revelation-trilogie">
    <div class="container">
        <!-- Titre de la section -->
        <div class="tripanel-header">
            <h2 class="tripanel-title">Nos trois jeux éducatifs juifs : Histoire, Loi, Mitsvot</h2>
            <div class="title-separator">
                <span class="separator-star">✦</span>
            </div>
            <p class="tripanel-subtitle">Chaque jeu est une porte. Quelle histoire voulez-vous écrire ?</p>
        </div>
        
        <!-- Wrapper pour les 3 boîtes vidéo -->
        <div class="revelation-boxes-wrapper">
            <!-- 3 vidéos de morphing -->
        </div>
    </div>
</section>
```

### Structure d'une vidéo de morphing
Chaque animation est encapsulée dans un `.revelation-video-wrapper` :

```html
<div class="revelation-video-wrapper">
    <!-- Vidéo de morphing -->
    <video id="video1" 
           src="videos/reveal-jdc.mp4" 
           autoplay 
           muted 
           playsinline 
           preload="auto" 
           data-game="jdc">
    </video>
    
    <!-- Bouton replay (caché par défaut) -->
    <button class="revelation-replay-btn replay-btn-jdc" 
            data-video="video1" 
            data-text="text1" 
            aria-label="Rejouer">
        <svg>...</svg>
    </button>
    
    <!-- Titre sous la vidéo -->
    <div class="revelation-text game-label game-label-jdc" id="text1">
        L'HISTOIRE
    </div>
</div>
```

### Les 3 vidéos
1. **JDC (Jérusalem du Ciel)** : `videos/reveal-jdc.mp4` → `#video1` → Titre "L'HISTOIRE"
2. **MOH (Maître de la Halakha)** : `videos/reveal-moh.mp4` → `#video2` → Titre "LA LOI"
3. **POZ (Pratique au Quotidien)** : `videos/reveal-poz.mp4` → `#video3` → Titre "LES MITSVOT"

---

## 🎨 Styles CSS (fichier `css/main.css`)

### Section principale
**Lignes 6166-6839** : Tous les styles de la section `#revelation-trilogie`

#### Caractéristiques principales :
- **Background** : `#faf9f6` (blanc cassé chaud)
- **Layout** : Flexbox avec 3 colonnes (desktop), 2 colonnes (tablette), 1 colonne (mobile)
- **Espacement** : Gap de 2rem entre les boîtes

### Wrapper vidéo (`.revelation-video-wrapper`)
**Lignes 6274-6283**
- **Largeur** : 28% (desktop)
- **Cursor** : pointer (cliquable)
- **Transition** : 0.4s ease pour toutes les propriétés

### Vidéos (styles de base)
**Lignes 6291-6307**
```css
#revelation-trilogie video {
    width: 100%;
    height: 52vh;
    object-fit: cover; /* Première frame remplit le conteneur */
    object-position: center;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    transition: all 0.4s ease;
    filter: none; /* État initial : EN COULEURS */
    opacity: 1;
}
```

### Tailles spécifiques par jeu
**Lignes 6329-6363**

- **JDC** (`#video1`) : `transform: scale(0.7)` → **30% réduction**
- **MOH** (`#video2`) : `transform: scale(0.65)` → **35% réduction**
- **POZ** (`#video3`) : `transform: scale(0.65)` → **35% réduction**

#### Exception MOH
MOH garde `object-fit: cover` même pendant la lecture pour éviter un cadre blanc :
```css
video#video2[data-playing] {
    object-fit: cover !important;
    object-position: center center !important;
}
```

### Object-fit pendant la lecture
**Lignes 6311-6324**
- **JDC et POZ** : Passent à `object-fit: contain` pendant la lecture (pour voir l'animation complète)
- **MOH** : Reste en `cover` (évite le cadre blanc)

### État inactive (après animation)
**Lignes 6376-6382**
```css
.revelation-video-wrapper.inactive video {
    filter: grayscale(100%) brightness(0.9);
    opacity: 0.7;
    transition: filter 1s ease, opacity 1s ease;
}
```

### Hover sur éléments inactive
**Lignes 6393-6419**
- **Resaturation INSTANTANÉE** : `filter: grayscale(0%) brightness(1.05)`
- **Zoom animé** : +8% de la taille de base
  - JDC : `scale(0.756)` (0.7 × 1.08)
  - MOH/POZ : `scale(0.702)` (0.65 × 1.08)
- **Ombre dorée** : `box-shadow: 0 12px 35px rgba(237, 162, 52, 0.35)`

### Bouton replay
**Lignes 6424-6485**
- **Position** : Absolute, top: 15px, right: 15px
- **Style** : Cercle de 36px, fond semi-transparent, bordure dorée
- **État initial** : `opacity: 0`, `pointer-events: none`
- **État visible** : Classe `.visible` ajoutée après la fin de l'animation
- **Hover** : Background doré, rotation de l'icône SVG

### Titres (`.revelation-text`)
**Lignes 6587-6619**
- **Position** : Relative (sous la vidéo, pas en overlay)
- **Style** : Uppercase, letter-spacing: 2px, couleur gris foncé
- **Apparition** : Opacity 0 → 1 à 50% de la progression de la vidéo
- **Hover** : Devient doré (`#eda234`) sur les éléments inactive

### Indicateur "Découvrir"
**Lignes 6490-6522**
- **Pseudo-élément** `::after` sur `.revelation-video-wrapper`
- **Apparition** : Au hover sur les éléments inactive
- **Style** : Bouton doré avec gradient, positionné au-dessus du titre

### Responsive
**Lignes 6622-6789**
- **Tablette** (≤1023px) : 2 colonnes, largeur 48%, hauteur vidéo 40vh
- **Mobile** (≤767px) : 1 colonne, largeur 100%, hauteur vidéo 36vh
- **Mobile** : Indicateur "Découvrir" toujours visible

---

## ⚙️ JavaScript (fichier `js/main.js`)

### Fonction principale : `initRevelationVideos()`
**Lignes 759-1057**

Cette fonction initialise toutes les animations de morphing. Elle est appelée au chargement du DOM via `initializeApp()`.

### 🔹 Références des éléments
```javascript
const v1 = document.getElementById('video1'); // JDC
const v2 = document.getElementById('video2'); // MOH
const v3 = document.getElementById('video3'); // POZ
const text1 = document.getElementById('text1'); // Titre JDC
const text2 = document.getElementById('text2'); // Titre MOH
const text3 = document.getElementById('text3'); // Titre POZ
```

### 🔹 Configuration initiale des vidéos
**Lignes 770-776**
- Forcer `object-fit: cover` et `object-position: center` pour la première frame
- S'assurer que les posters remplissent le conteneur

### 🔹 Apparition des titres (`setupTitleAppearance`)
**Lignes 788-818**
- **Déclenchement** : À 50% de la progression de la vidéo
- **Fonctionnement** : Écoute l'événement `timeupdate`
- **Flag** : `labelShown` pour ne montrer qu'une fois
- **Classe ajoutée** : `.visible` sur le titre

### 🔹 Bouton replay
**Lignes 824-894**

#### Fonction `showReplayButton(videoElement)`
- Affiche le bouton replay après la désaturation (2s + 500ms)
- Ajoute la classe `.visible` au bouton

#### Fonction `replayAnimation(videoElement, titleElement)`
**Lignes 839-877**
1. Cache le bouton replay
2. Retire la classe `.inactive` (réinitialise les couleurs)
3. Réinitialise la vidéo (`currentTime = 0`)
4. Retire `data-playing` pour revenir à `cover`
5. Redémarre la vidéo avec `.play()`

### 🔹 Gestion de l'attribut `data-playing`
**Lignes 896-933**

Cet attribut contrôle le `object-fit` pendant la lecture :
- **Sans `data-playing`** : `object-fit: cover` (première frame)
- **Avec `data-playing`** : 
  - JDC/POZ → `object-fit: contain`
  - MOH → `object-fit: cover` (exception)

**Événements** :
- `loadeddata` : Force `cover` si pas de `data-playing`
- `play` : Ajoute `data-playing`, ajuste `object-fit`
- `ended` : Retire `data-playing`, revient à `cover`

### 🔹 Synchronisation des vidéos
**Lignes 935-980**

**Système basé sur le début réel de JDC** :
- JDC (`video1`) : **Autoplay** (démarre immédiatement)
- MOH (`video2`) : Démarre **7 secondes** après le début de JDC
- POZ (`video3`) : Démarre **10 secondes** après le début de JDC

**Implémentation** :
```javascript
let jdcStartTime = null;

v1.addEventListener('play', () => {
    if (!jdcStartTime) {
        jdcStartTime = Date.now();
        
        // MOH après 7s
        setTimeout(() => {
            v2.play().catch(err => console.log('Erreur autoplay v2:', err));
        }, 7000);
        
        // POZ après 10s
        setTimeout(() => {
            v3.play().catch(err => console.log('Erreur autoplay v3:', err));
        }, 10000);
    }
});
```

### 🔹 Navigation au clic
**Lignes 982-1009**

**Fonction `scrollToHeroBis(wrapper, targetId)`** :
- Rend le wrapper cliquable
- Scroll smooth vers la section `hero-bis` correspondante :
  - JDC → `#hero-bis-jdc`
  - MOH → `#hero-bis-moh`
  - POZ → `#hero-bis-poz`

### 🔹 Désaturation après animation
**Lignes 1011-1056**

**Fonction `desaturateBox(videoElement, wrapperElement)`** :
- Ajoute la classe `.inactive` après **2 secondes** de délai
- Désaturation progressive (1s ease)
- Affiche le bouton replay

**Événements `ended`** :
- Chaque vidéo écoute `ended`
- Appelle `desaturateBox()` et `showReplayButton()`

---

## 🔄 Flux d'animation complet

### Séquence d'événements

1. **Chargement de la page**
   - Les 3 vidéos sont chargées avec `preload="auto"`
   - JDC a `autoplay` activé
   - Première frame affichée en `cover`

2. **Début de JDC**
   - `video1` démarre (autoplay)
   - `data-playing` ajouté
   - `object-fit` passe à `contain` (sauf MOH)
   - Timestamp enregistré pour synchronisation

3. **Synchronisation**
   - **+7s** : MOH démarre
   - **+10s** : POZ démarre

4. **Pendant la lecture**
   - À **50% de progression** : Titre apparaît (`.visible`)
   - Les vidéos jouent en parallèle

5. **Fin de l'animation**
   - Événement `ended` déclenché
   - Délai de **2 secondes**
   - Classe `.inactive` ajoutée
   - Désaturation progressive (1s)
   - Bouton replay affiché (`.visible`)

6. **État inactive**
   - Vidéos en niveaux de gris (70% opacity)
   - Hover → Resaturation instantanée + zoom 8%
   - Clic → Navigation vers `hero-bis`

7. **Replay**
   - Clic sur bouton replay
   - Réinitialisation complète
   - Animation redémarre

---

## 📁 Fichiers concernés

### Fichiers modifiés/créés
1. **`index.html`** (lignes 326-378)
   - Structure HTML de la section `#revelation-trilogie`

2. **`css/main.css`** (lignes 6166-6839)
   - Tous les styles des animations de morphing

3. **`js/main.js`** (lignes 759-1057)
   - Fonction `initRevelationVideos()` et toutes ses sous-fonctions

### Fichiers multimédias
- `videos/reveal-jdc.mp4` - Animation JDC
- `videos/reveal-moh.mp4` - Animation MOH
- `videos/reveal-poz.mp4` - Animation POZ

---

## 🎯 Points d'attention pour les améliorations

### Zones à améliorer
1. **Synchronisation**
   - Délais fixes (7s et 10s) basés sur le début de JDC
   - Peut être amélioré pour s'adapter à différentes durées de vidéo

2. **Performance**
   - 3 vidéos en autoplay simultané peuvent être lourdes
   - Considérer un chargement progressif ou lazy loading

3. **Responsive**
   - Tailles différentes par jeu (scale 0.7 vs 0.65)
   - Peut créer des incohérences visuelles sur certains écrans

4. **Accessibilité**
   - Pas de contrôle de pause/play pour l'utilisateur (sauf replay)
   - Pas de sous-titres ou de descriptions audio

5. **Gestion d'erreurs**
   - Pas de fallback si une vidéo ne charge pas
   - Pas de gestion si autoplay est bloqué

---

## 🔧 Variables et constantes importantes

### Délais
```javascript
const DELAY_BEFORE_DESATURATE = 2000; // 2 secondes avant désaturation
```

### Sélecteurs
- Vidéos : `#video1`, `#video2`, `#video3`
- Titres : `#text1`, `#text2`, `#text3`
- Wrappers : `.revelation-video-wrapper`
- Section : `#revelation-trilogie`

### Classes CSS importantes
- `.inactive` : État après animation (désaturé)
- `.visible` : Titre visible, bouton replay visible
- `[data-playing]` : Attribut pour vidéo en cours de lecture

---

## 📝 Notes techniques

### Object-fit
- **Cover** : Première frame et état inactive (remplit le conteneur)
- **Contain** : Pendant la lecture (JDC et POZ seulement)
- **MOH** : Toujours cover (évite le cadre blanc)

### Transform scale
- **JDC** : 0.7 (70% de la taille)
- **MOH/POZ** : 0.65 (65% de la taille)
- **Hover** : +8% (multiplié par 1.08)

### Synchronisation
- Basée sur le **timestamp réel** du début de JDC
- Pas de synchronisation basée sur la durée totale des vidéos
- Délais fixes en millisecondes

---

## 🚀 Pour reprendre le projet

### Étapes de compréhension
1. **Lire cette documentation** pour comprendre la structure globale
2. **Examiner le HTML** (`index.html` lignes 326-378) pour voir la structure
3. **Parcourir le CSS** (`css/main.css` lignes 6166-6839) pour comprendre les styles
4. **Analyser le JavaScript** (`js/main.js` lignes 759-1057) pour comprendre la logique

### Points d'entrée pour modifications
- **Changer les délais de synchronisation** : Lignes 953-966 dans `js/main.js`
- **Modifier les tailles** : Lignes 6329-6345 dans `css/main.css`
- **Ajuster la désaturation** : Lignes 6376-6382 dans `css/main.css`
- **Changer l'apparition des titres** : Lignes 788-818 dans `js/main.js`

---

**Date de création** : 2024  
**Dernière mise à jour** : Structure actuelle du projet  
**Version** : 1.0

