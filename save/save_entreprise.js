const entrepriseDB = require('../modele/entrepriseModel');

async function afficherFichesEntreprises() {
    const entreprises = await entrepriseDB.getAllEntreprises();

    console.log("\n📄 Fiches des entreprises :");

    for (const entreprise of entreprises) {
        console.log(`\n🏢 ${entreprise.Nom}`);
        console.log(`📍 Siège : ${entreprise.Siege_social}`);
        console.log(`📅 Création : ${entreprise.Date_creation}`);
        console.log(`💰 Chiffre d'affaires : ${entreprise.Chiffre_affaire}`);
        console.log(`📊 Statut : ${entreprise.Statut}`);
        console.log(`🏭 Secteur ID : ${entreprise.Secteur_id}`);
        console.log(`👥 Employés : ${entreprise.Nombre_employes}`);
        console.log(`📧 Email : ${entreprise.Email}`);
        console.log(`📞 Téléphone : ${entreprise.Telephone}`);
    }
}

module.exports = afficherFichesEntreprises;
