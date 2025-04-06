const prompt = require("prompt-sync")({ sigint: true });
const entrepriseDB = require('./modele/entrepriseModel');
const actionnaireDB = require('./modele/actionnaireModel');
const afficherFichesEntreprises = require('./save/save_entreprise');
const afficherContratsActionnaires = require('./save/save_contrat');

async function main() {
    // Définir les entreprises à créer
    const entreprises = {
        'TechCorp': { 
            siege_social: 'Paris', 
            date_creation: 2001, 
            chiffre_affaire: 500000, 
            statut: 'Active', 
            secteur_id: 1, 
            nombre_employes: 200, 
            email: 'contact@techcorp.com', 
            telephone: '0123456789' 
        },
        'GreenSolutions': { 
            siege_social: 'Lyon', 
            date_creation: 2010, 
            chiffre_affaire: 300000, 
            statut: 'Active', 
            secteur_id: 2, 
            nombre_employes: 150, 
            email: 'contact@greensolutions.com', 
            telephone: '0987654321' 
        }
    };

    // Créer les entreprises si elles n'existent pas déjà
    for (let entreprise_name in entreprises) {
        // Vérifiez d'abord si l'entreprise existe
        const existingEntreprise = await entrepriseDB.getEntrepriseByName(entreprise_name);
        
        if (!existingEntreprise) {
            await entrepriseDB.createEntreprise(
                entreprise_name, 
                entreprises[entreprise_name].siege_social, 
                entreprises[entreprise_name].date_creation, 
                entreprises[entreprise_name].chiffre_affaire, 
                entreprises[entreprise_name].statut, 
                entreprises[entreprise_name].secteur_id, 
                entreprises[entreprise_name].nombre_employes, 
                entreprises[entreprise_name].email, 
                entreprises[entreprise_name].telephone
            );
            console.log(`✅ Entreprise '${entreprise_name}' créée avec succès.`);
        } else {
            console.log(`⚠️ L'entreprise '${entreprise_name}' existe déjà.`);
        }
    }

    // Boucle de menu principal
    while (true) {
        console.log("\n📁 Menu principal");
        console.log("1️⃣ Afficher les fiches des entreprises");
        console.log("2️⃣ Afficher les contrats/actionnaires");
        console.log("3️⃣ Quitter");

        const choix = prompt("Choisissez une option (1/2/3) : ");

        if (choix === "1") {
            await afficherFichesEntreprises();
        } else if (choix === "2") {
            await afficherContratsActionnaires();
        } else if (choix === "3") {
            console.log("👋 À bientôt !");
            process.exit();
        } else {
            console.log("❌ Choix invalide. Réessayez.");
        }
    }
}

main().catch(err => console.error(err));
