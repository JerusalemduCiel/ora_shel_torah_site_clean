/* ========================================
   ORA SHEL TORAH - GESTION DU PANIER (SIMPLIFIÉ)
   ======================================== */

// Panier minimal
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour ouvrir/fermer le panier
function toggleCart() {
    const panel = document.getElementById('panier-sidebar');
    if (panel) {
        panel.classList.toggle('open');
        document.body.style.overflow = panel.classList.contains('open') ? 'hidden' : '';
    }
}

// Fonction pour fermer le panier
function closeCart() {
    const panel = document.getElementById('panier-sidebar');
    if (panel) {
        panel.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Mettre à jour l'affichage du panier
function updateCartDisplay() {
    // Compteur
    const count = document.querySelector('.cart-count');
    if (count) {
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        count.textContent = total;
        if (total > 0) {
            count.style.display = 'flex';
        } else {
            count.style.display = 'none';
        }
    }
    
    // Articles dans le panier
    const itemsDiv = document.querySelector('.cart-items');
    if (!itemsDiv) return;
    
    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p class="cart-empty">Votre panier est vide</p>';
        return;
    }
    
    itemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item" data-product="${item.id || ''}">
            ${item.image ? `<img src="${item.image}" alt="${item.name || ''}" loading="lazy">` : ''}
            <div class="cart-item-info">
                <h4>${item.name || 'Produit'}</h4>
                <p class="cart-item-price">${formatPrice(item.price || 0)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-minus" onclick="updateQuantity('${item.id}', ${(item.quantity || 1) - 1})">-</button>
                <input type="number" value="${item.quantity || 1}" min="1" max="10" 
                       onchange="updateQuantity('${item.id}', this.value)">
                <button class="qty-plus" onclick="updateQuantity('${item.id}', ${(item.quantity || 1) + 1})">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Supprimer">🗑️</button>
        </div>
    `).join('');
    
    // Total
    updateCartTotal();
}

// Mettre à jour le total
function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    const shipping = subtotal >= 50 ? 0 : 5.90;
    const total = subtotal + shipping;
    
    const subtotalEl = document.querySelector('.subtotal-amount');
    const shippingEl = document.querySelector('.shipping-amount');
    const totalEl = document.querySelector('.total-amount');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Offerte' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// Formater le prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Ajouter au panier
function addToCart(product) {
    if (!product || !product.id) {
        console.error('Produit invalide:', product);
        return;
    }
    
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name || 'Produit',
            price: product.price || 0,
            image: product.image || '',
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
}

// Retirer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Mettre à jour la quantité
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = Math.max(1, parseInt(quantity) || 1);
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

// Sauvegarder le panier
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Erreur lors de la sauvegarde du panier:', e);
    }
}

// Initialiser le panier
function initCart() {
    // Charger depuis localStorage
    try {
        const saved = localStorage.getItem('cart');
        if (saved) {
            cart = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Erreur lors du chargement du panier:', e);
        cart = [];
    }
    
    // Mettre à jour l'affichage
    updateCartDisplay();
    
    // Écouter les clics sur les boutons "Ajouter au panier"
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            if (!productCard) return;
            
            const productId = productCard.getAttribute('data-product-id');
            const name = productCard.querySelector('h3')?.textContent || '';
            const price = parseFloat(btn.getAttribute('data-price') || '0');
            const image = productCard.querySelector('img')?.src || '';
            
            addToCart({
                id: productId,
                name: name,
                price: price,
                image: image
            });
        });
    });
    
    // Écouter les clics sur l'icône du panier
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    }
    
    // Écouter les clics sur le bouton fermer
    const closeBtn = document.querySelector('.close-cart');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeCart();
        });
    }
}

// Fonction pour passer commande
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Votre panier est vide');
        return;
    }
    
    // Rediriger vers la page de commande ou Stripe
    alert('Fonctionnalité de commande en cours de développement');
    // TODO: Implémenter l'intégration Stripe
}

// Exporter les fonctions globales
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.proceedToCheckout = proceedToCheckout;
window.cart = cart;

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', initCart);
