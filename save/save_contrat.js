// save_contrat.js
const entrepriseDB = require('../modele/entrepriseModel');
const actionnaireDB = require('../modele/actionnaireModel');

async function afficherContratsActionnaires() {
    const entreprises = await entrepriseDB.getAllEntreprises();

    console.log("\n📃 Contrats et actionnaires par entreprise :");

    if (entreprises.length === 0) {
        console.log("⚠️ Aucune entreprise enregistrée.");
        return;
    }

    for (const entreprise of entreprises) {
        console.log(`\n🏢 Entreprise : ${entreprise.Nom}`);

        const actionnaires = await actionnaireDB.getActionnairesByEntreprise(entreprise.entreprise_id);
        if (actionnaires.length === 0) {
            console.log("⚠️ Aucun actionnaire enregistré.");
        } else {
            for (const actionnaire of actionnaires) {
                console.log(`➡️ ${actionnaire.Nom} - ${actionnaire.Pourcentage}%`);

                // Récupérer les contrats associés à cet actionnaire
                const contrats = await actionnaireDB.getContratsByEntreprise(entreprise.entreprise_id);
                if (contrats.length === 0) {
                    console.log("⚠️ Aucun contrat trouvé pour cet actionnaire.");
                } else {
                    contrats.forEach(contrat => {
                        console.log(`    📄 Contrat : ${contrat.Pourcentage}% - Date : ${contrat.Date_contrat}`);
                    });
                }
            }
        }
    }
}

// Assurez-vous que la fonction est exportée
module.exports = afficherContratsActionnaires;
