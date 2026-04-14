const https = require('https');

module.exports = async function handler(req, res) {

  // ── Vérification webhook (GET de Meta) ──
  if (req.method === 'GET') {
    const mode      = req.query['hub.mode'];
    const token     = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('✅ Webhook vérifié');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Token invalide');
  }

  // ── Réception DM (POST de Meta) ──
  if (req.method === 'POST') {
    try {
      const body = req.body;

      if (body.object !== 'instagram') {
        return res.status(404).send('Not found');
      }

      const entries = body.entry || [];

      for (const entry of entries) {
        const events = entry.messaging || [];

        for (const event of events) {
          if (event.message?.is_echo) continue;
          if (!event.message?.text)   continue;

          const payload = JSON.stringify({
            sender_id:    event.sender.id,
            message_text: event.message.text,
            message_id:   event.message.mid,
            timestamp:    event.timestamp
          });

          console.log('DM reçu:', payload);

          // Envoyer vers Make (seulement si MAKE_WEBHOOK_URL est défini)
          if (process.env.MAKE_WEBHOOK_URL) {
            await postJson(process.env.MAKE_WEBHOOK_URL, payload);
          }
        }
      }

      return res.status(200).send('OK');

    } catch (err) {
      console.error('Erreur:', err.message);
      return res.status(200).send('OK'); // Toujours 200 pour Meta
    }
  }

  return res.status(405).send('Method not allowed');
};

// Fonction utilitaire pour POST sans fetch
function postJson(url, jsonString) {
  return new Promise((resolve, reject) => {
    const parsed  = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      method:   'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(jsonString)
      }
    };
    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', resolve);
    });
    req.on('error', reject);
    req.write(jsonString);
    req.end();
  });
}
