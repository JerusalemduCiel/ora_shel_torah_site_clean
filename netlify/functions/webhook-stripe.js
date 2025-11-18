const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Vérifier la signature du webhook
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

  // Traiter l'événement checkout.session.completed
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    // Récupérer les détails de la commande
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.metadata?.customer_name || 'Client';
    const amount = (session.amount_total / 100).toFixed(2);
    
    // Envoyer email à toi (vendeur) via Formspree
    try {
      await fetch('https://formspree.io/f/mblwlplg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `🎉 Nouvelle commande Ora Shel Torah - ${amount}€`,
          client: customerName,
          email: customerEmail,
          montant: amount + '€',
          session_id: session.id,
          date: new Date().toLocaleString('fr-FR')
        })
      });
      
      console.log('Email vendeur envoyé');
    } catch (error) {
      console.error('Erreur envoi email:', error);
    }
  }

  return { statusCode: 200, body: 'Webhook reçu' };
};

