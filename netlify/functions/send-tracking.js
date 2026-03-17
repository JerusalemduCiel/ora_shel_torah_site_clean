const fetch = require('node-fetch');

async function sendEmail(to, subject, htmlContent) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { name: 'Ora Shel Torah', email: 'commandes@orasheltorah.fr' },
      to: [{ email: to }],
      subject: subject,
      htmlContent: htmlContent
    })
  });
  return response.json();
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { email, name, tracking } = JSON.parse(event.body);

    if (!email || !tracking) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email et numéro de suivi requis' }) };
    }

    const trackingUrl = 'https://www.laposte.fr/outils/suivre-vos-envois?code=' + tracking;

    const result = await sendEmail(
      email,
      '📦 Votre commande Ora Shel Torah a été expédiée !',
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
        '<h2 style="color: #eda234;">Bonne nouvelle, ' + (name || 'cher client') + ' !</h2>' +
        '<p>Votre commande a été expédiée via <strong>Colissimo</strong>.</p>' +
        '<p>📦 <strong>Numéro de suivi :</strong> ' + tracking + '</p>' +
        '<div style="text-align:center; margin: 25px 0;">' +
          '<a href="' + trackingUrl + '" style="background:#eda234; color:#0f1419; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:16px;">📍 Suivre mon colis</a>' +
        '</div>' +
        '<p>La livraison est prévue sous <strong>2 à 3 jours ouvrés</strong> en boîte aux lettres.</p>' +
        '<p>Merci pour votre confiance !</p>' +
        '<hr/>' +
        '<p style="color: #666; font-size: 12px;">Ora Shel Torah — orasheltorah.fr</p>' +
      '</div>'
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
