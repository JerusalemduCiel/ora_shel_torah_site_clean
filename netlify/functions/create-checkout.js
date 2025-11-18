const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { cart, shipping, customerInfo } = JSON.parse(event.body);

    // Construire line_items pour Stripe
    const lineItems = cart.map(item => ({
      price: item.priceId,
      quantity: item.quantity
    }));

    // Ajouter frais de port si applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de port'
          },
          unit_amount: Math.round(shipping * 100)
        },
        quantity: 1
      });
    }

    // Créer session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/#boutique`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC']
      },
      metadata: {
        order_type: 'precommande',
        estimated_delivery: 'avril-mai-2026',
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id })
    };
    
  } catch (error) {
    console.error('Erreur Stripe:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

