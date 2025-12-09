# Popup d'inscription Prelaunch - Instructions

## ✅ Fichiers créés

1. **`css/prelaunch-popup.css`** - Styles du popup (cohérent avec le design du site)
2. **`js/prelaunch-popup.js`** - Logique d'interception et gestion du popup

## 📝 Fichiers modifiés

Les fichiers suivants ont été mis à jour pour inclure le popup :

- ✅ `index.html` - CSS et JS ajoutés
- ✅ `faq.html` - CSS et JS ajoutés  
- ✅ `a-propos.html` - CSS et JS ajoutés

## 🔧 Lignes à ajouter dans le `<head>` des autres pages

Si vous avez d'autres pages HTML qui contiennent des boutons d'achat, ajoutez ces lignes dans le `<head>` :

```html
<!-- CSS -->
<link rel="stylesheet" href="css/prelaunch-popup.css">
```

Et avant la fermeture du `</body>` :

```html
<!-- JavaScript -->
<script src="js/prelaunch-popup.js"></script>
```

## 🎯 Boutons interceptés

Le popup intercepte automatiquement tous les clics sur :

### Par classe CSS :
- `.btn-commander`
- `.btn-acheter`
- `.btn-add-to-cart`
- `.btn-ajouter-panier`
- `.btn-checkout`
- `.btn-precommander`
- `.btn-store`
- `.buy-button`

### Par attribut :
- `[data-stripe]`
- `[data-price-id]`

### Par URL :
- Liens contenant `stripe.com` ou `buy.stripe.com`

### Par texte :
- Boutons/liens contenant "Commander", "Acheter", "Précommander", "Ajouter au panier"

### Fonctions globales :
- `addToCart()` - Interceptée
- `proceedToCheckout()` - Interceptée

## 🎨 Fonctionnalités

### Comportement
- ✅ Intercepte tous les clics sur les boutons d'achat
- ✅ Affiche un popup élégant au lieu de l'action d'achat
- ✅ Formulaire d'inscription avec validation email
- ✅ Intégration Formspree (endpoint : `https://formspree.io/f/xwpkkgvp`)
- ✅ Message de succès après soumission
- ✅ Stockage localStorage pour ne pas redemander l'email

### Design
- ✅ Style cohérent avec le site (fond sombre, couleurs or/dorées)
- ✅ Overlay sombre semi-transparent avec blur
- ✅ Animation douce à l'ouverture (fade in + scale)
- ✅ Responsive mobile

### Fermeture
- ✅ Bouton X en haut à droite
- ✅ Clic sur l'overlay (hors du popup)
- ✅ Touche Escape
- ✅ Lien "Non merci"

## ⚙️ Configuration

Pour modifier l'endpoint Formspree, éditez la constante dans `js/prelaunch-popup.js` :

```javascript
const CONFIG = {
    formspreeEndpoint: 'https://formspree.io/f/xwpkkgvp', // ← Modifier ici
    localStorageKey: 'prelaunch_email_submitted',
    // ...
};
```

## 🧪 Test

1. Ouvrez une page du site (index.html, faq.html, ou a-propos.html)
2. Cliquez sur n'importe quel bouton d'achat (Commander, Précommander, Ajouter au panier, etc.)
3. Le popup devrait s'afficher
4. Entrez un email et soumettez
5. Le message de succès devrait apparaître
6. Après 3 secondes, le popup se ferme automatiquement
7. Si vous cliquez à nouveau sur un bouton d'achat, le popup ne s'affichera plus (email déjà soumis)

## 🔄 Réinitialiser le localStorage

Pour tester à nouveau ou permettre à un utilisateur de s'inscrire à nouveau, supprimez la clé du localStorage :

```javascript
localStorage.removeItem('prelaunch_email_submitted');
```

Ou via la console du navigateur :
```javascript
localStorage.clear();
```

## 📧 Formspree

Les emails sont envoyés à Formspree avec :
- **Email** : L'adresse email de l'utilisateur
- **Sujet** : "Nouvelle inscription prelaunch - Ora Shel Torah"
- **_replyto** : L'adresse email (pour pouvoir répondre)

Assurez-vous que votre formulaire Formspree est configuré pour accepter ces données.

## 🐛 Dépannage

### Le popup ne s'affiche pas
- Vérifiez que les fichiers CSS et JS sont bien chargés (Console du navigateur)
- Vérifiez qu'il n'y a pas d'erreurs JavaScript dans la console
- Vérifiez que l'email n'a pas déjà été soumis (localStorage)

### Le formulaire ne s'envoie pas
- Vérifiez que l'endpoint Formspree est correct
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que votre formulaire Formspree accepte les requêtes depuis votre domaine

### Les boutons ne sont pas interceptés
- Vérifiez que le script est chargé après le DOM
- Vérifiez que les sélecteurs correspondent aux boutons de votre page
- Utilisez la console pour vérifier : `document.querySelectorAll('.btn-commander')`

## 📱 Responsive

Le popup est entièrement responsive :
- Desktop : Largeur max 500px
- Tablet : Padding réduit
- Mobile : Padding et tailles de police adaptées

## ✨ Personnalisation

### Modifier le texte
Éditez le HTML dans `js/prelaunch-popup.js`, fonction `createPopup()` :

```javascript
popup.innerHTML = `
    <h2 class="prelaunch-title">Votre titre</h2>
    <p class="prelaunch-message">Votre message</p>
    // ...
`;
```

### Modifier les couleurs
Éditez les variables CSS dans `css/prelaunch-popup.css` ou utilisez les variables existantes du site (`--color-gold`, `--color-dark-bg`, etc.)

---

**Note** : Le popup est désactivé automatiquement pour les utilisateurs qui ont déjà soumis leur email. Pour le réactiver, supprimez la clé `prelaunch_email_submitted` du localStorage.


