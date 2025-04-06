const prompt = require("prompt-sync")({ sigint: true });
const entrepriseDB = require("../modele/entrepriseModel");
const actionnaireDB = require("../modele/actionnaireModel");

async function modificationEntreprise() {
    while (true) {
        console.log("\n🛠 Modification d'une entreprise");
        console.log("1️⃣ Modifier une entreprise existante");
        console.log("2️⃣ Retour au menu principal");
        console.log("3️⃣ Quitter l'application");

        const choix = prompt("Choisissez une option (1/2/3) : ");

        if (choix === "2") {
            console.log("🔙 Retour au menu principal.");
            return;
        }
        if (choix === "3") {
            console.log("👋 Merci d'avoir utilisé le service. À bientôt !");
            process.exit();
        }
        if (choix !== "1") {
            console.log("❌ Option invalide, veuillez réessayer.");
            continue;
        }

        const nomEntreprise = prompt("Entrez le nom de l'entreprise à modifier : ");
        const entreprise = await entrepriseDB.getEntrepriseByName(nomEntreprise);

        if (!entreprise || !entreprise.entreprise_id) {
            console.log("❌ Entreprise non trouvée.");
            continue;
        }

        const entrepriseID = entreprise.entreprise_id;
        console.log(`✅ Entreprise trouvée : ID=${entrepriseID}, Nom=${entreprise.Nom}`);

        const champsModifiables = {
            Nom: "Nom de l'entreprise",
            Siege_social: "Siège social",
            Date_creation: "Date de création (JJ/MM/AAAA)",
            Chiffre_affaire: "Chiffre d'affaire",
            Statut: "Statut juridique",
            Secteur_id: "Identifiant du secteur",
            Nombre_employes: "Nombre d'employés",
            Email: "Email",
            Telephone: "Téléphone"
        };

        while (true) {
            console.log("\nQue souhaitez-vous modifier ?");
            Object.keys(champsModifiables).forEach((key, index) => {
                console.log(`${index + 1}️⃣ ${champsModifiables[key]}`);
            });
            console.log("🔄 Gérer les actionnaires (g)");
            console.log("🔙 Quitter la modification (q)");

            const modifChoix = prompt("Choisissez une option (1/2/3/.../q) : ");
            if (modifChoix.toLowerCase() === "q") {
                console.log("🔙 Fin de la modification.");
                break;
            }

            if (modifChoix === "g") {
                await gererActionnaires(entrepriseID);
                continue;
            }

            const champSelectionne = Object.keys(champsModifiables)[parseInt(modifChoix) - 1];
            if (!champSelectionne) {
                console.log("❌ Option invalide, veuillez réessayer.");
                continue;
            }

            const nouvelleValeur = prompt(`Nouvelle valeur pour ${champsModifiables[champSelectionne]} (actuel: ${entreprise[champSelectionne]}) : `);
            if (nouvelleValeur.trim()) {
                console.log(`🔄 Mise à jour de ${champSelectionne}...`);
                await entrepriseDB.updateEntreprise(entrepriseID, { [champSelectionne]: nouvelleValeur });
                console.log("✅ Modification enregistrée avec succès !");
            } else {
                console.log("⚠️ Aucune modification apportée.");
            }
        }
    }
}

async function gererActionnaires(entrepriseID) {
    while (true) {
        console.log("\n📈 Gérer les actionnaires");

        const actionnaires = await actionnaireDB.getActionnairesByEntreprise(entrepriseID);
        console.log("\n🔍 Liste des actionnaires actuels :");
        if (actionnaires.length === 0) {
            console.log("⚠️ Aucun actionnaire enregistré.");
        } else {
            actionnaires.forEach(a => {
                console.log(`➡️ ${a.Nom} - ${a.Pourcentage}%`);
            });
        }

        console.log("\n1️⃣ Ajouter un actionnaire");
        console.log("2️⃣ Retirer un actionnaire");
        console.log("🔙 Retour (r)");

        const choixActionnaire = prompt("Choisissez une option (1/2/r) : ");

        if (choixActionnaire === "1") {
            const nomActionnaire = prompt("Entrez le nom du nouvel actionnaire : ");
            const pourcentage = prompt("Entrez son pourcentage de participation : ");
            const pourcentageFloat = parseFloat(pourcentage);

            // Vérifiez que le pourcentage est valide
            if (isNaN(pourcentageFloat) || pourcentageFloat <= 0) {
                console.log("❌ Pourcentage invalide, veuillez entrer un nombre supérieur à 0.");
                continue;
            }

            // Vérifier la somme des pourcentages des actionnaires existants
            const totalPourcentage = actionnaires.reduce((acc, a) => acc + a.Pourcentage, 0);
            if (totalPourcentage + pourcentageFloat > 100) {
                console.log("❌ La somme des pourcentages des actionnaires ne peut pas dépasser 100%.");
                continue;
            }

            // Ajoutez l'actionnaire et créez le contrat
            await actionnaireDB.ajouterActionnaire(entrepriseID, nomActionnaire, pourcentageFloat);
            console.log(`✅ Actionnaire '${nomActionnaire}' ajouté avec succès avec un pourcentage de ${pourcentageFloat}%.`);
        } else if (choixActionnaire === "2") {
            const nomActionnaire = prompt("Entrez le nom de l'actionnaire à retirer : ");
            const actionnaire = actionnaires.find(a => a.Nom === nomActionnaire);

            if (actionnaire) {
                await actionnaireDB.retirerActionnaire(actionnaire.Actionnaire_id);
                console.log(`✅ Actionnaire '${nomActionnaire}' retiré avec succès.`);
            } else {
                console.log(`❌ Aucun actionnaire trouvé avec le nom '${nomActionnaire}'.`);
            }
        } else if (choixActionnaire === "r") {
            console.log("🔙 Retour à la modification de l'entreprise.");
            break;
        } else {
            console.log("❌ Option invalide, veuillez réessayer.");
        }
    }
}

module.exports = modificationEntreprise;
