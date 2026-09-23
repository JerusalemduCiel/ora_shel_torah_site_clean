const Stripe = require('stripe');
const { appendOrderRow } = require('./lib/google-sheets');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const TRACKING_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1khrIVFybxVgrfBp6pzpEf_kwDCHklgwrc_sulpqe_lo/edit';

function adminTrackingSheetLinkHtml() {
  return (
    '<div style="margin: 16px 0 24px; text-align: center; padding: 14px; background: #f9f5f0; border-radius: 8px; border-left: 4px solid #eda234;">' +
    '<a href="' +
    TRACKING_SHEET_URL +
    '" style="color: #0f1419; font-weight: bold; font-size: 16px; text-decoration: underline;">' +
    '📊 Ouvrir le tableau de suivi des précommandes</a>' +
    '</div>'
  );
}

const PRICE_TO_PRODUCT = {
  price_1TBx07LLfYKjr3rUGkvFpLOf: 'pt',
  price_1Scn6GL4ecjfMIxOPxaM9FMl: 'pt',
  price_1TBx06LLfYKjr3rUqsV4WG2Z: 'moh',
  price_1TgIhwLLfYKjr3rUAALun0DH: 'lannee'
};

function resolveProductKey(priceId) {
  return PRICE_TO_PRODUCT[priceId] || 'pt';
}

function productLabel(productKey) {
  if (productKey === 'lannee') return "L'Année d'Israël";
  if (productKey === 'moh') return 'Minhag ou Halakha';
  return 'La Parole Transmise';
}

/** Corps brut Stripe (Netlify peut base64-encoder le body → signature invalide sinon). */
function getRawBody(event) {
  if (!event.body) return '';
  if (event.isBase64Encoded) {
    return Buffer.from(event.body, 'base64').toString('utf8');
  }
  return event.body;
}

function getStripeSignature(headers) {
  if (!headers) return '';
  return (
    headers['stripe-signature'] ||
    headers['Stripe-Signature'] ||
    headers['STRIPE-SIGNATURE'] ||
    ''
  );
}

function euros(cents) {
  if (cents == null || Number.isNaN(Number(cents))) return '';
  return (Number(cents) / 100).toFixed(2);
}

function formatDateFr(date = new Date()) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function meta(session, key, fallback = '') {
  const v = session.metadata?.[key];
  if (v == null) return fallback;
  const s = String(v).trim();
  return s || fallback;
}

/** Liste complète des articles pour l'email vendeur (metadata ou line items Stripe). */
function buildAdminProductSummary(session, lineItemsData) {
  const fromMeta = meta(session, 'order_summary');
  if (fromMeta) return fromMeta;

  const parts = (lineItemsData || [])
    .filter((li) => li.price?.type !== 'recurring')
    .map((li) => {
      const name = li.description || productLabel(resolveProductKey(li.price?.id));
      const qty = li.quantity || 1;
      return `${name} ×${qty}`;
    });
  return parts.join(' + ') || 'Produit';
}

function buildPtClientShippingHtml(sessionId, smLower, isClickCollect, shippingText) {
  return smLower.includes('collect')
    ? '<div style="margin:20px 0; padding:16px; background:#f9f5f0; border-radius:8px; border-left:3px solid #eda234;">' +
        '<p style="margin:0 0 8px 0;">📍 <strong>Retrait en boutique</strong></p>' +
        '<img src="https://orasheltorah.fr/images/logo_blush.png" alt="Blush Général Store" style="height:50px; margin:8px 0;"/>' +
        '<p style="margin:4px 0; font-size:14px;">' +
        '<strong>Blush Général Store</strong><br/>' +
        '7 Rue de Sèze, 69006 Lyon<br/>' +
        'Votre commande est disponible dans la journée.<br/>' +
        "Nous vous confirmons par email dès qu'elle est prête." +
        '</p>' +
        '<div style="text-align:center;margin-top:20px;">' +
        '<a href="https://orasheltorah.fr/.netlify/functions/confirm-pickup?token=' +
        sessionId +
        '" style="display:inline-block;background:#eda234;color:#0f1419;' +
        'padding:14px 28px;border-radius:8px;text-decoration:none;' +
        'font-weight:bold;font-size:16px;">✅ Marquer comme retiré</a>' +
        '<p style="color:#999;font-size:11px;margin-top:8px;">' +
        'La vendeuse clique sur ce bouton lors de la remise du livre.</p>' +
        '</div>' +
        '</div>'
    : isClickCollect
      ? '<p>📍 Votre commande sera disponible dans la journée au Blush Général Store — 7 Rue de Sèze, 69006 Lyon. Vous recevrez un email de confirmation dès qu\'elle est prête à retirer.</p>'
      : '<p>📦 <strong>Livraison :</strong> ' + shippingText + '</p>';
}

function lanneePickupAddress(pickupStore) {
  if (pickupStore === 'blush-chapeaux') {
    return 'Blush Concept Store, 3 rue des Quatre Chapeaux, 69002 Lyon';
  }
  return 'Blush Général Store, 7 Rue de Sèze, 69006 Lyon';
}

function buildLanneeClientShippingHtml(sessionId, smLower, session) {
  const pickupStore = meta(session, 'pickup_store');
  const relayName = meta(session, 'relay_name');
  const relayAddress = meta(session, 'relay_address');
  const relayCity = meta(session, 'relay_city');
  const relayId = meta(session, 'relay_id');

  if (
    smLower.includes('collect') ||
    smLower.includes('ney') ||
    smLower.includes('chapeaux')
  ) {
    const boutique = lanneePickupAddress(pickupStore);
    return (
      '<div style="margin:20px 0; padding:16px; background:#f9f5f0; border-radius:8px; border-left:3px solid #eda234;">' +
      '<p style="margin:0 0 8px 0;">📍 <strong>Click & Collect — gratuit</strong></p>' +
      '<p style="margin:4px 0; font-size:14px;">' +
      '<strong>' +
      boutique +
      '</strong><br/>' +
      "Votre commande sera disponible en boutique à l'été 2026." +
      '</p>' +
      '<div style="text-align:center;margin-top:20px;">' +
      '<a href="https://orasheltorah.fr/.netlify/functions/confirm-pickup?token=' +
      sessionId +
      '" style="display:inline-block;background:#eda234;color:#0f1419;' +
      'padding:14px 28px;border-radius:8px;text-decoration:none;' +
      'font-weight:bold;font-size:16px;">✅ Marquer comme retiré</a>' +
      '</div>' +
      '</div>'
    );
  }

  if (smLower.includes('relay') || smLower.includes('mondial')) {
    const relayDetail = relayName
      ? '<br/><strong>Point relais :</strong> ' +
        relayName +
        (relayAddress ? ', ' + relayAddress : '') +
        (relayCity ? ', ' + relayCity : '') +
        (relayId ? ' (ID ' + relayId + ')' : '')
      : '';
    return (
      '<p>📍 <strong>Livraison Mondial Relay (Point Relais)</strong> — 3 à 5 jours ouvrés après expédition.' +
      relayDetail +
      '</p>'
    );
  }

  return '<p>📍 <strong>Livraison Mondial Relay (Point Relais)</strong> — 3 à 5 jours ouvrés après expédition.</p>';
}

function buildPtClientEmailHtml(customerName, amount, clientShippingHtml, adresse, sessionId) {
  return (
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
    '<h2 style="color: #eda234;">✨ ' +
    customerName +
    ", merci d'illuminer ce projet !</h2>" +
    "<p>En passant commande, vous ne faites pas qu'acheter un livre — vous participez à une aventure : celle de transmettre la beauté et la richesse du judaïsme à travers le jeu et le partage.</p>" +
    '<p><strong>Votre commande de ' +
    amount +
    ' € a bien été confirmée.</strong></p>' +
    clientShippingHtml +
    '<p>📍 <strong>Adresse :</strong> ' +
    adresse +
    '</p>' +
    "<p>📧 Vous recevrez un email avec votre numéro de suivi dès l'expédition.</p>" +
    '<p style="margin-top:20px;">Merci de faire partie des premiers soutiens d\'Ora Shel Torah. 🙏</p>' +
    '<hr/>' +
    '<p style="color: #666; font-size: 12px;">' +
    'Ora Shel Torah — <a href="https://orasheltorah.fr">orasheltorah.fr</a><br/>' +
    'Référence : ' +
    sessionId +
    '</p>' +
    '</div>'
  );
}

function buildLanneeClientEmailHtml(
  customerName,
  amount,
  clientShippingHtml,
  adresse,
  sessionId,
  isPrecommande
) {
  const expeditionLine = isPrecommande
    ? '<p>📅 <strong>Expédition prévue été 2026, avant Roch Hachana.</strong></p>'
    : "<p>📧 Vous recevrez un email avec votre numéro de suivi dès l'expédition.</p>";

  return (
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
    '<h2 style="color: #eda234;">✨ ' +
    customerName +
    ', merci pour votre précommande !</h2>' +
    "<p>Vous venez de réserver <strong>L'Année d'Israël</strong> — le calendrier des fêtes de Roch Hachana à Tou BeAv, selon les quatre voies de lecture de la tradition.</p>" +
    '<p><strong>Votre commande de ' +
    amount +
    ' € a bien été confirmée.</strong></p>' +
    clientShippingHtml +
    '<p>📍 <strong>Adresse :</strong> ' +
    adresse +
    '</p>' +
    expeditionLine +
    '<p style="margin-top:20px;">Merci de faire confiance à Ora Shel Torah pour accompagner votre année juive. 🙏</p>' +
    '<hr/>' +
    '<p style="color: #666; font-size: 12px;">' +
    'Ora Shel Torah — <a href="https://orasheltorah.fr">orasheltorah.fr</a><br/>' +
    'Référence : ' +
    sessionId +
    '</p>' +
    '</div>'
  );
}

function buildAdminCollectRow(productKey, isClickCollect, session) {
  if (!isClickCollect) return '';
  if (productKey === 'lannee') {
    const boutique = lanneePickupAddress(meta(session, 'pickup_store'));
    return (
      '<tr><td colspan="2">📍 Retrait en boutique : ' + boutique + '</td></tr>'
    );
  }
  return '<tr><td colspan="2">📍 Retrait en boutique : Blush Général Store<br/>7 Rue de Sèze, 69006 Lyon</td></tr>';
}

/**
 * Champs commande robustes : metadata checkout custom OU session Stripe nue
 * (liens de paiement « remise en main propre », Payment Links sans metadata).
 */
function extractOrderFields(session, lineItemsData) {
  const md = session.metadata || {};
  const details = session.customer_details || {};
  const shipping =
    session.collected_information?.shipping_details ||
    session.shipping_details ||
    null;
  const shipAddr = shipping?.address || details.address || {};

  const customerName =
    md.customer_name ||
    details.name ||
    shipping?.name ||
    'Client';

  const customerEmail =
    details.email ||
    session.customer_email ||
    md.customer_email ||
    '';

  const customerPhone = md.customer_phone || details.phone || '';

  const customerCity =
    md.customer_city || md.ville || shipAddr.city || '';
  const customerPostal =
    md.customer_zip || md.code_postal || shipAddr.postal_code || '';
  const customerAddress =
    md.customer_address ||
    md.adresse ||
    [shipAddr.line1, shipAddr.line2].filter(Boolean).join(', ') ||
    '';
  const pays = md.pays || shipAddr.country || 'FR';

  const adresseFromMeta = [md.customer_address, md.customer_city, md.customer_zip]
    .filter(Boolean)
    .join(', ');
  const adresseFromShip = [customerAddress, customerPostal, customerCity, pays]
    .filter(Boolean)
    .join(', ');
  const adresse = (adresseFromMeta || adresseFromShip || md.adresse || '').trim();

  const shippingMethod = md.shipping_method || md.mode_livraison || 'colissimo';
  const productSummary = buildAdminProductSummary(session, lineItemsData);
  const qtyFromLines = (lineItemsData || []).reduce(
    (sum, li) => sum + (li.quantity || 0),
    0
  );
  const quantite =
    md.quantite_totale || (qtyFromLines > 0 ? String(qtyFromLines) : '');

  const amountTotalCents = session.amount_total ?? 0;
  const shippingCents =
    session.total_details?.amount_shipping ??
    (md.shipping_cost ? Math.round(Number(md.shipping_cost) * 100) : 0);
  const productsCents = Math.max(0, amountTotalCents - (shippingCents || 0));

  return {
    customerName,
    customerEmail,
    customerPhone,
    customerCity,
    customerPostal,
    customerAddress,
    adresse,
    pays,
    shippingMethod,
    productSummary,
    quantite,
    amountTotal: euros(amountTotalCents),
    amountProducts: euros(productsCents),
    amountShipping: euros(shippingCents || 0),
    destinataire: md.destinataire || customerName,
    modeLivraison: md.mode_livraison || shippingMethod,
    orderType: md.order_type || '',
    notes: md.notes || (Object.keys(md).length === 0 ? 'Lien paiement / sans metadata' : '')
  };
}

async function sendEmail(to, subject, htmlContent) {
  if (!to) {
    return { skipped: true, reason: 'destinataire vide' };
  }
  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY manquante');
    return { skipped: true, reason: 'BREVO_API_KEY manquante' };
  }

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
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('Brevo error', response.status, JSON.stringify(data));
  }
  return data;
}

async function writeTrackingSheet(fields, sessionId) {
  const statut =
    fields.orderType === 'precommande' ? 'Précommande' : 'À traiter';

  return appendOrderRow({
    date: formatDateFr(),
    statut,
    produit: fields.productSummary,
    qte: fields.quantite,
    montant: fields.amountProducts,
    port: fields.amountShipping,
    total: fields.amountTotal,
    client: fields.customerName,
    email: fields.customerEmail,
    destinataire: fields.destinataire,
    adresse: fields.customerAddress || fields.adresse,
    cp: fields.customerPostal,
    ville: fields.customerCity,
    pays: fields.pays,
    modeLivraison: fields.modeLivraison,
    suivi: '',
    dateExpedition: '',
    stripeId: sessionId,
    notes: fields.notes
  });
}

exports.handler = async (event) => {
  const sig = getStripeSignature(event.headers);
  const rawBody = getRawBody(event);
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const sessionId = session.id;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
        limit: 100
      });
      const priceId = lineItems.data[0]?.price?.id;
      const productKey = resolveProductKey(priceId);
      const fields = extractOrderFields(session, lineItems.data);

      const smLower = (fields.shippingMethod || '').toLowerCase();
      const isClickCollectPt =
        smLower.includes('collect') || smLower.includes('pickup');
      const isClickCollectLannee =
        isClickCollectPt ||
        smLower.includes('ney') ||
        smLower.includes('chapeaux');
      const isPrecommande = fields.orderType === 'precommande';
      const hasLannee = lineItems.data.some(
        (li) => resolveProductKey(li.price?.id) === 'lannee'
      );

      let clientShippingHtml;
      let clientEmailHtml;
      let isClickCollectAdmin;

      if (productKey === 'lannee') {
        isClickCollectAdmin = isClickCollectLannee;
        clientShippingHtml = buildLanneeClientShippingHtml(
          sessionId,
          smLower,
          session
        );
        clientEmailHtml = buildLanneeClientEmailHtml(
          fields.customerName,
          fields.amountTotal,
          clientShippingHtml,
          fields.adresse,
          sessionId,
          isPrecommande
        );
      } else {
        isClickCollectAdmin = isClickCollectPt;
        const shippingText =
          smLower.includes('relay') || smLower.includes('mondial')
            ? 'Mondial Relay (Point Relais) — 3 à 5 jours ouvrés'
            : 'Colissimo (Domicile) — 2 à 3 jours ouvrés';
        clientShippingHtml = buildPtClientShippingHtml(
          sessionId,
          smLower,
          isClickCollectPt,
          shippingText
        );

        if (
          session.metadata &&
          typeof session.metadata.estimated_delivery === 'string' &&
          session.metadata.estimated_delivery
            .toLowerCase()
            .includes('avril-mai-2026')
        ) {
          session.metadata.estimated_delivery = '2-3 jours ouvrés';
        }

        clientEmailHtml = buildPtClientEmailHtml(
          fields.customerName,
          fields.amountTotal,
          clientShippingHtml,
          fields.adresse,
          sessionId
        );
      }

      // EMAIL CLIENT (skip si pas d'email — liens paiement / sessions incomplètes)
      console.log(
        'Envoi email client à:',
        fields.customerEmail || '(aucun)',
        '(produits:',
        fields.productSummary,
        ')'
      );
      const clientResult = await sendEmail(
        fields.customerEmail,
        '✅ Votre commande Ora Shel Torah est confirmée !',
        clientEmailHtml
      );
      console.log('Résultat email client:', JSON.stringify(clientResult));

      // EMAIL ADMIN
      const dashboardUrl =
        `https://orasheltorah.fr/admin.html?` +
        `name=${encodeURIComponent(fields.customerName)}&` +
        `email=${encodeURIComponent(fields.customerEmail)}&` +
        `phone=${encodeURIComponent(fields.customerPhone)}&` +
        `address=${encodeURIComponent(fields.adresse)}&` +
        `city=${encodeURIComponent(fields.customerCity)}&` +
        `postal=${encodeURIComponent(fields.customerPostal)}&` +
        `amount=${encodeURIComponent(fields.amountTotal)}&` +
        `shipping=${encodeURIComponent(fields.shippingMethod)}&` +
        `relay_id=${encodeURIComponent(meta(session, 'relay_id'))}&` +
        `relay_name=${encodeURIComponent(meta(session, 'relay_name'))}&` +
        `relay_address=${encodeURIComponent(meta(session, 'relay_address'))}&` +
        `relay_city=${encodeURIComponent(meta(session, 'relay_city'))}&` +
        `product=${encodeURIComponent(fields.productSummary)}&` +
        `session=${encodeURIComponent(sessionId)}`;

      console.log(
        'Envoi email admin à: mlumbroso68@gmail.com',
        '(produits:',
        fields.productSummary,
        ')'
      );
      const adminResult = await sendEmail(
        'mlumbroso68@gmail.com',
        `🛒 Nouvelle commande — ${fields.customerName} — ${fields.amountTotal} €`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #eda234;">Nouvelle commande reçue !</h2>
          ${adminTrackingSheetLinkHtml()}
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>Produit :</strong></td><td>${fields.productSummary}</td></tr>
            <tr><td><strong>Qté totale :</strong></td><td>${fields.quantite}</td></tr>
            <tr><td><strong>Nom :</strong></td><td>${fields.customerName}</td></tr>
            <tr><td><strong>Email :</strong></td><td>${fields.customerEmail}</td></tr>
            <tr><td><strong>Téléphone :</strong></td><td>${fields.customerPhone}</td></tr>
            <tr><td><strong>Adresse :</strong></td><td>${fields.adresse}</td></tr>
            <tr><td><strong>Montant :</strong></td><td>${fields.amountTotal} €</td></tr>
            <tr><td><strong>Référence :</strong></td><td>${sessionId}</td></tr>
            ${
              hasLannee
                ? buildAdminCollectRow('lannee', isClickCollectAdmin, session)
                : isClickCollectAdmin
                  ? '<tr><td colspan="2">📍 Retrait en boutique : Blush Général Store<br/>7 Rue de Sèze, 69006 Lyon</td></tr>'
                  : ''
            }
          </table>
          <div style="margin-top:20px; text-align:center;">
            <a href="${dashboardUrl}" style="background:#eda234; color:#0f1419; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:16px;">📦 Accéder au dashboard commandes</a>
          </div>
        </div>
        `
      );
      console.log('Résultat email admin:', JSON.stringify(adminResult));

      // Google Sheet (remplace Make) — échec isolé, ne doit pas casser les emails
      try {
        const sheetResult = await writeTrackingSheet(fields, sessionId);
        console.log('Sheet append OK:', JSON.stringify(sheetResult));
      } catch (sheetErr) {
        console.error('Erreur écriture Google Sheet:', sheetErr.message || sheetErr);
      }
    } catch (emailError) {
      console.error('Erreur traitement commande:', emailError);
    }
  }

  // Toujours 200 après signature OK → évite la désactivation auto Stripe
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
