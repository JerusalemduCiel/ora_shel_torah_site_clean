const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Poids des produits (DOIT correspondre au frontend)
const productWeights = {
  'jdc': 2.8,
  'moh': 0.7,
  'poz': 0.6,
  'pack': 4.0
};

// Grille Colissimo (DOIT correspondre au frontend)
const colissimoRates = [
  { maxWeight: 1.0, price: 7.50 },
  { maxWeight: 2.0, price: 9.50 },
  { maxWeight: 3.0, price: 12.00 },
  { maxWeight: 5.0, price: 15.00 },
  { maxWeight: 10.0, price: 20.00 },
  { maxWeight: 30.0, price: 28.00 }
];

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { items, customerInfo } = JSON.parse(event.body);

    // Vérifier que la clé secrète Stripe est configurée
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY manquante dans les variables d\'environnement');
    }

    // Vérifier que les produits demandés sont disponibles
    const unavailableProducts = ['jdc', 'poz'];
    const priceMap = {
      'price_1SBf5wL4ecjfMIxOm0nbZ5sp': 'jdc',
      'price_1SBf6vL4ecjfMIxOYXAbWfh8': 'moh',
      'price_1SBf7lL4ecjfMIxOKuRj4czs': 'poz'
    };
    
    const requestedProducts = items.map(item => priceMap[item.priceId]).filter(Boolean);
    const hasUnavailable = requestedProducts.some(p => unavailableProducts.includes(p));

    if (hasUnavailable) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Certains produits ne sont pas encore disponibles. Sortie prévue : Printemps 2026.'
        })
      };
    }

    // Mapping priceId → productId
    const priceMap = {
      'price_1SBf5wL4ecjfMIxOm0nbZ5sp': 'jdc',
      'price_1SBf6vL4ecjfMIxOYXAbWfh8': 'moh',
      'price_1SBf7lL4ecjfMIxOKuRj4czs': 'poz'
    };

    // Calculer poids total
    const totalWeight = items.reduce((sum, item) => {
      const productId = priceMap[item.priceId];
      const weight = productWeights[productId] || 0;
      return sum + (weight * (item.quantity || 1));
    }, 0);

    // Trouver tarif Colissimo
    let shippingCost = 35.00; // Par défaut si > 30kg
    for (let rate of colissimoRates) {
      if (totalWeight <= rate.maxWeight) {
        shippingCost = rate.price;
        break;
      }
    }

    // Line items Stripe
    const lineItems = items.map(item => ({
      price: item.priceId,
      quantity: item.quantity || 1
    }));

    // Ajouter frais de port
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Frais de port Colissimo',
          description: `Colis ${totalWeight.toFixed(1)} kg`
        },
        unit_amount: Math.round(shippingCost * 100)
      },
      quantity: 1
    });

    // Créer session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/#boutique`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['FR']
      },
      metadata: {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        total_weight: totalWeight.toFixed(2),
        shipping_cost: shippingCost.toFixed(2)
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id })
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
