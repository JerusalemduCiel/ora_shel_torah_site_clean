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

function getNextOpenSlot() {
  const now = new Date();
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const openDays = [2, 3, 4, 5, 6]; // Mardi=2 à Samedi=6
  const openHour = 10;
  const closeHour = 19;

  let candidate = new Date(now);
  
  // Si aujourd'hui est un jour d'ouverture et avant 18h30, proposer aujourd'hui
  if (openDays.includes(candidate.getDay()) && candidate.getHours() < closeHour - 0.5) {
    if (candidate.getHours() >= openHour) {
      // Déjà ouvert, proposer maintenant
    } else {
      candidate.setHours(openHour, 0, 0, 0);
    }
  } else {
    // Chercher le prochain jour ouvré
    for (let i = 1; i <= 7; i++) {
      candidate = new Date(now);
      candidate.setDate(candidate.getDate() + i);
      if (openDays.includes(candidate.getDay())) {
        candidate.setHours(openHour, 0, 0, 0);
        break;
      }
    }
  }
  
  const dayName = days[candidate.getDay()];
  const date = candidate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  return dayName + ' ' + date + ' à partir de 10h00';
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
    const { email, name } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email requis' }) };
    }

    const nextSlot = getNextOpenSlot();

    const result = await sendEmail(
      email,
      '📚 Votre livre vous attend chez Blush General Store !',
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
        '<h2 style="color: #eda234;">✨ ' + (name || 'Cher client') + ', merci pour votre commande !</h2>' +
        '<p>En choisissant Ora Shel Torah, vous participez à l\'envol d\'un projet qui a pour ambition de transmettre la beauté du judaïsme à travers le jeu et le partage. Merci de votre confiance.</p>' +
        '<p>Votre livre <strong>« La Parole Transmise — Lumières d\'Israël »</strong> est d\'ores et déjà disponible en magasin et vous sera remis sur simple présentation de cet email.</p>' +
        '<div style="background: #fdf8f0; border: 2px solid #eda234; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">' +
          '<p style="font-size: 1.1rem; font-weight: bold; color: #2c3e50; margin: 0 0 10px 0;">📍 Blush General Store</p>' +
          '<p style="margin: 5px 0;">7 Rue Ney, 69006 Lyon</p>' +
          '<p style="margin: 5px 0;">📅 <strong>Disponible dès ' + nextSlot + '</strong></p>' +
          '<p style="margin: 15px 0 5px 0; font-size: 0.9rem; color: #666;">Horaires d\'ouverture :</p>' +
          '<p style="margin: 0; font-size: 0.9rem; color: #666;">Mardi au Samedi : 10h00 – 19h00</p>' +
          '<p style="margin: 0; font-size: 0.9rem; color: #666;">Dimanche et Lundi : Fermé</p>' +
        '</div>' +
        '<p>N\'hésitez pas à nous contacter si vous avez la moindre question. 🙏</p>' +
        '<hr/>' +
        '<p style="color: #666; font-size: 12px;">' +
          'Ora Shel Torah — <a href="https://orasheltorah.fr">orasheltorah.fr</a>' +
        '</p>' +
      '</div>'
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, result, nextSlot })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
