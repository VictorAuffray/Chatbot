const db = require('./entrepriseModel');

async function main() {
  const entreprises = {
    'TechCorp': { siege_social: 'Paris', date_creation: 2001, chiffre_affaire: 500000, statut: 'Active', secteur_id: 1, nombre_employes: 200, email: 'contact@techcorp.com', telephone: '0123456789' },
    'GreenSolutions': { siege_social: 'Lyon', date_creation: 2010, chiffre_affaire: 300000, statut: 'Active', secteur_id: 2, nombre_employes: 150, email: 'contact@greensolutions.com', telephone: '0987654321' }
  };

  for (let entreprise_name in entreprises) {
    await db.createEntreprise(entreprise_name, entreprises[entreprise_name].siege_social, entreprises[entreprise_name].date_creation, entreprises[entreprise_name].chiffre_affaire, entreprises[entreprise_name].statut, entreprises[entreprise_name].secteur_id, entreprises[entreprise_name].nombre_employes, entreprises[entreprise_name].email, entreprises[entreprise_name].telephone);
  }

  // Read
  const getAll = await db.getAllEntreprises();
  console.log('Toutes les entreprises :', getAll);
}

main().catch(err => console.error(err));
