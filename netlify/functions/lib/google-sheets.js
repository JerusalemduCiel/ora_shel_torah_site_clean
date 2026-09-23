/**
 * Append d'une ligne dans Google Sheets via compte de service (JWT + Sheets API).
 * Variables d'env requises :
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  (avec \n échappés OK)
 *   GOOGLE_SHEET_ID                     (défaut : sheet de suivi OST)
 *   GOOGLE_SHEET_TAB                    (défaut : Untitled)
 */
const crypto = require('crypto');

const DEFAULT_SHEET_ID = '1khrIVFybxVgrfBp6pzpEf_kwDCHklgwrc_sulpqe_lo';
const DEFAULT_SHEET_TAB = 'Untitled';

function getPrivateKey() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '';
  return raw.replace(/\\n/g, '\n').trim();
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken() {
  const email = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '').trim();
  const key = getPrivateKey();
  if (!email || !key) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY manquants'
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    })
  );

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  signer.end();
  const signature = signer
    .sign(key)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${header}.${claim}.${signature}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      'grant_type=' +
      encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') +
      '&assertion=' +
      encodeURIComponent(jwt)
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(
      'Google OAuth token error: ' + JSON.stringify(data)
    );
  }
  return data.access_token;
}

/**
 * Colonnes attendues (onglet Untitled) :
 * Date, Statut, Produit, Qté, Montant, Port, Total, Client, Email,
 * Destinataire, Adresse, CP, Ville, Pays, Mode de livraison,
 * N° suivi, Date expédition, N° Stripe, Notes
 */
async function appendOrderRow(row) {
  const sheetId =
    process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || DEFAULT_SHEET_TAB;
  const range = `'${tab}'!A:S`;

  const values = [
    row.date || '',
    row.statut || '',
    row.produit || '',
    row.qte || '',
    row.montant || '',
    row.port || '',
    row.total || '',
    row.client || '',
    row.email || '',
    row.destinataire || '',
    row.adresse || '',
    row.cp || '',
    row.ville || '',
    row.pays || '',
    row.modeLivraison || '',
    row.suivi || '',
    row.dateExpedition || '',
    row.stripeId || '',
    row.notes || ''
  ];

  const token = await getAccessToken();
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}` +
    `/values/${encodeURIComponent(range)}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [values] })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Sheets append error: ' + JSON.stringify(data));
  }
  return data;
}

module.exports = { appendOrderRow };
