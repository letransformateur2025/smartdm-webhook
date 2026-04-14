module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>Politique de confidentialité — SmartCubeCode</title></head>
    <body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:0 20px">
      <h1>Politique de confidentialité</h1>
      <p>Dernière mise à jour : avril 2025</p>
      <h2>Données collectées</h2>
      <p>Cette application collecte uniquement les messages Instagram envoyés directement par les utilisateurs dans le cadre d'une conversation initiée par eux-mêmes.</p>
      <h2>Utilisation des données</h2>
      <p>Les données sont utilisées exclusivement pour générer des réponses automatiques pertinentes. Elles ne sont ni vendues ni partagées avec des tiers.</p>
      <h2>Conservation</h2>
      <p>Les messages sont conservés pendant 90 jours maximum puis supprimés automatiquement.</p>
      <h2>Contact</h2>
      <p>Pour toute question : contact@smartcubecode.com</p>
    </body>
    </html>
  `);
};
