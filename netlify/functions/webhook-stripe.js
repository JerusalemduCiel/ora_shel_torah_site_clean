const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const https = require('https');

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: 'Webhook Error' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.metadata?.customer_name || 'Client';
    const amount = (session.amount_total / 100).toFixed(2);

    // Envoyer email via Formspree avec https natif
    const data = JSON.stringify({
      _subject: `🎉 Nouvelle commande Ora Shel Torah - ${amount}€`,
      client: customerName,
      email: customerEmail,
      montant: amount + '€',
      session_id: session.id,
      date: new Date().toLocaleString('fr-FR')
    });

    const options = {
      hostname: 'formspree.io',
      port: 443,
      path: '/f/mblwlplg',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        console.log('Email vendeur envoyé, status:', res.statusCode);
        resolve({ statusCode: 200, body: 'Webhook reçu' });
      });

      req.on('error', (error) => {
        console.error('Erreur envoi email:', error);
        resolve({ statusCode: 200, body: 'Webhook reçu (email failed)' });
      });

      req.write(data);
      req.end();
    });
  }

  return { statusCode: 200, body: 'Webhook reçu' };
};
