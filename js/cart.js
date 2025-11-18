/* ========================================
   ORA SHEL TORAH - GESTION DU PANIER
   ======================================== */

// Gestionnaire de panier (localStorage)
const Cart = {
    items: [],
    
    init() {
        // Charger depuis localStorage
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
                this.updateUI();
            } catch (e) {
                console.error('Erreur lors du chargement du panier:', e);
                this.items = [];
            }
        }
        
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        // Boutons "Ajouter au panier"
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const product = this.extractProductData(productCard);
                if (product) {
                    this.add(product);
                }
            });
        });
        
        // Icône panier (par ID ou classe)
        const cartIcon = document.getElementById('cart-icon') || document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleCart();
            });
        }
        
        // Mettre à jour le compteur au chargement
        this.updateCartCount();
        
        // Bouton fermer panier
        const closeCartBtn = document.querySelector('.close-cart');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => {
                this.closeCart();
            });
        }
        
        // Fermer panier en cliquant à l'extérieur
        const cartSidebar = document.getElementById('panier-sidebar');
        if (cartSidebar) {
            cartSidebar.addEventListener('click', (e) => {
                if (e.target === cartSidebar) {
                    this.closeCart();
                }
            });
        }
    },
    
    extractProductData(productCard) {
        if (!productCard) return null;
        
        const productId = productCard.getAttribute('data-product-id');
        const name = productCard.querySelector('h3')?.textContent || '';
        const price = parseFloat(productCard.querySelector('.btn-add-to-cart')?.getAttribute('data-price') || '0');
        const image = productCard.querySelector('img')?.src || '';
        
        return {
            id: productId,
            name: name,
            price: price,
            image: image
        };
    },
    
    add(product) {
        if (!product || !product.id) {
            console.error('Produit invalide:', product);
            return;
        }
        
        const existing = this.items.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.save();
        this.updateUI();
        this.showNotification(`${product.name} ajouté au panier`);
        
        // Animation du bouton
        this.animateAddButton(product.id);
    },
    
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
        this.showNotification('Produit retiré du panier');
    },
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            const newQuantity = Math.max(1, parseInt(quantity));
            if (newQuantity !== item.quantity) {
                item.quantity = newQuantity;
                this.save();
                this.updateUI();
            }
        }
    },
    
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
        this.showNotification('Panier vidé');
    },
    
    getTotal() {
        return this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    },
    
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    save() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde du panier:', e);
        }
    },
    
    updateUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartSummary();
    },
    
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const count = this.getCount();
            cartCount.textContent = count;
            if (count > 0) {
                cartCount.classList.add('show');
            } else {
                cartCount.classList.remove('show');
            }
        }
    },
    
    updateCartItems() {
        const container = document.querySelector('.cart-items');
        if (!container) return;
        
        if (this.items.length === 0) {
            container.innerHTML = '<p class="cart-empty">Votre panier est vide</p>';
            return;
        }
        
        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product="${item.id}">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${this.formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-minus" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="10" 
                           onchange="Cart.updateQuantity('${item.id}', this.value)">
                    <button class="qty-plus" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="cart-item-remove" onclick="Cart.remove('${item.id}')" title="Supprimer">🗑️</button>
            </div>
        `).join('');
    },
    
    updateCartSummary() {
        const subtotal = this.getTotal();
        const shipping = subtotal >= 50 ? 0 : 5.90;
        const total = subtotal + shipping;
        
        const subtotalEl = document.querySelector('.subtotal-amount');
        const shippingEl = document.querySelector('.shipping-amount');
        const totalEl = document.querySelector('.total-amount');
        
        if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Offerte' : this.formatPrice(shipping);
        if (totalEl) totalEl.textContent = this.formatPrice(total);
    },
    
    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    },
    
    showNotification(message) {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.toast-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Créer nouvelle notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Animation d'apparition
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Suppression automatique
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    },
    
    animateAddButton(productId) {
        const button = document.querySelector(`[data-product="${productId}"]`);
        if (button) {
            button.style.transform = 'scale(0.95)';
            button.style.backgroundColor = '#2ecc71';
            button.textContent = '✓ Ajouté !';
            
            setTimeout(() => {
                button.style.transform = '';
                button.style.backgroundColor = '';
                button.textContent = 'Ajouter au panier';
            }, 1500);
        }
    },
    
    toggleCart() {
        const cartSidebar = document.getElementById('panier-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('open');
            document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
        }
    },
    
    closeCart() {
        const cartSidebar = document.getElementById('panier-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
            document.body.style.overflow = '';
        }
    },
    
    // Méthode pour vider le panier (utile après commande)
    clearAfterOrder() {
        this.items = [];
        this.save();
        this.updateUI();
        this.closeCart();
    }
};

// ========================================
// GESTION DE LA COMMANDE
// ========================================

async function proceedToCheckout() {
    if (Cart.items.length === 0) {
        alert('Votre panier est vide');
        return;
    }
    
    // Afficher un loader sur le bouton
    const checkoutBtn = document.querySelector('button[onclick="proceedToCheckout()"]');
    if (checkoutBtn) {
        checkoutBtn.textContent = '⏳ Chargement...';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.7';
    }
    
    try {
        console.log('🛒 Envoi des articles à Stripe:', Cart.items);
        
        // Appeler la Netlify Function
        const response = await fetch('/.netlify/functions/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: Cart.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                }))
            }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.url) {
            console.log('✅ URL Stripe reçue, redirection...');
            // Rediriger vers Stripe Checkout
            window.location.href = data.url;
        } else {
            throw new Error('URL de paiement non reçue');
        }
    } catch (error) {
        console.error('❌ Erreur lors de la création du checkout:', error);
        alert(`Une erreur est survenue : ${error.message}\n\nVeuillez réessayer ou nous contacter.`);
        
        // Restaurer le bouton
        if (checkoutBtn) {
            checkoutBtn.textContent = 'Passer commande';
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
        }
    }
}

// Simulation de l'appel Stripe (à remplacer par la vraie API)
async function simulateStripeCheckout(items) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulation d'un appel réussi
            resolve({
                success: true,
                checkoutUrl: '#checkout-success' // URL de redirection
            });
        }, 1000);
    });
}

// ========================================
// FONCTIONS GLOBALES POUR LES ÉVÉNEMENTS
// ========================================

// Fonction globale pour fermer le panier
function closeCart() {
    Cart.closeCart();
}

// ========================================
// INITIALISATION
// ========================================

// Initialiser le panier au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    Cart.init();
});

// ========================================
// EXPORT POUR UTILISATION DANS D'AUTRES MODULES
// ========================================

window.Cart = Cart;
window.proceedToCheckout = proceedToCheckout;
window.closeCart = closeCart;

// Fonction globale pour ouvrir/fermer le panier (utilise panier-sidebar)
function toggleCart() {
    Cart.toggleCart();
}

window.toggleCart = toggleCart;
