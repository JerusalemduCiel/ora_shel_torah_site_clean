const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const BASE_URL = process.env.URL || 'https://ora-shel-torah-site.netlify.app';
  // Gérer CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body);
    
    console.log('📦 Articles reçus:', items);
    
    // Mapper les produits vers les Price IDs Stripe
    const priceIds = {
      'jdc': 'price_1SBf5wL4ecjfMIxOm0nbZ5sp',
      'moh': 'price_1SBf6vL4ecjfMIxOYXAbWfh8',
      'poz': 'price_1SBf7lL4ecjfMIxOKuRj4czs'
    };
    
    // Construire les line_items pour Stripe
    const lineItems = items.map(item => {
      // Si c'est le pack, créer un line_item custom
      if (item.id === 'pack') {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Pack Complet Ora Shel Torah',
              description: 'Les 3 jeux + contenus exclusifs',
              images: [`${BASE_URL}/images/pack-3d.png`],
            },
            unit_amount: 7990, // 79.90€ en centimes
          },
          quantity: item.quantity,
        };
      }
      
      // Sinon utiliser les Price IDs existants
      return {
        price: priceIds[item.id],
        quantity: item.quantity,
      };
    });

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${event.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin}/index.html#acte-6`,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC', 'CA'],
      },
      locale: 'fr',
      billing_address_collection: 'required',
    });

    console.log('✅ Session Stripe créée:', session.id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('❌ Erreur Stripe:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};


