const knex = require('knex')(require('../knexfile')['development']);

async function getActionnairesByEntreprise(entrepriseID) {
    try {
        const actionnaires = await knex("ACTIONNAIRE_ENTREPRISE")
            .join("ACTIONNAIRE", "ACTIONNAIRE_ENTREPRISE.Actionnaire_id", "=", "ACTIONNAIRE.Actionnaire_id")
            .select("ACTIONNAIRE.Actionnaire_id", "ACTIONNAIRE.Nom", "ACTIONNAIRE_ENTREPRISE.Pourcentage")
            .where("ACTIONNAIRE_ENTREPRISE.Entreprise_id", entrepriseID);
        return actionnaires;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des actionnaires :", error);
        return [];
    }
}

async function ajouterActionnaire(entrepriseID, nom, pourcentage) {
    try {
        // Vérifier si l'actionnaire existe déjà
        let actionnaire = await knex("ACTIONNAIRE").where("Nom", nom).first();

        if (!actionnaire) {
            // Si l'actionnaire n'existe pas, nous l'ajoutons
            const newActionnaireIDArray = await knex("ACTIONNAIRE")
                .insert({ Nom: nom })
                .returning("Actionnaire_id");

            const newActionnaireID = newActionnaireIDArray[0].Actionnaire_id;
            actionnaire = { Actionnaire_id: newActionnaireID }; // On crée un objet actionnaire
        }

        // Ajouter l'actionnaire à l'entreprise
        await knex("ACTIONNAIRE_ENTREPRISE").insert({
            Actionnaire_id: actionnaire.Actionnaire_id,
            Entreprise_id: entrepriseID,
            Pourcentage: pourcentage
        });

        // 🔗 Créer un contrat lié à cet actionnaire
        await creerContratActionnaire(entrepriseID, actionnaire.Actionnaire_id, pourcentage);

        console.log(`✅ Actionnaire '${nom}' ajouté avec contrat.`);

    } catch (error) {
        console.error("❌ Erreur lors de l'ajout de l'actionnaire :", error);
    }
}





async function retirerActionnaire(actionnaireID) {
    try {
        // Vérifiez d'abord si l'actionnaire existe dans la table de liaison
        const actionnaireExists = await knex("ACTIONNAIRE_ENTREPRISE")
            .where("Actionnaire_id", actionnaireID)
            .first();

        if (!actionnaireExists) {
            console.log("❌ L'actionnaire n'est pas associé à une entreprise ou n'existe pas.");
            return;
        }

        // Supprimez l'actionnaire de la table de liaison
        await knex("ACTIONNAIRE_ENTREPRISE")
            .where("Actionnaire_id", actionnaireID)
            .del();

        // Optionnel : Supprimer également l'actionnaire de la table ACTIONNAIRE
        await knex("ACTIONNAIRE").where("Actionnaire_id", actionnaireID).del();

    } catch (error) {
        console.error("❌ Erreur lors de la suppression de l'actionnaire :", error);
    }
}


async function creerContratActionnaire(entrepriseID, actionnaireID, pourcentage) {
    try {
        const dateContrat = new Date().toISOString().split('T')[0]; // Format de date: yyyy-mm-dd

        await knex("CONTRAT_ACTIONNAIRE").insert({
            Entreprise_id: entrepriseID,
            Actionnaire_id: actionnaireID,
            Pourcentage: pourcentage,
            Date_contrat: dateContrat
        });

        console.log("📄 Contrat d’actionnaire créé avec succès.");
    } catch (error) {
        console.error("❌ Erreur lors de la création du contrat :", error);
    }
}


async function getContratsByEntreprise(entrepriseID) {
    try {
        const contrats = await knex("CONTRAT_ACTIONNAIRE")
            .join("ACTIONNAIRE", "CONTRAT_ACTIONNAIRE.Actionnaire_id", "=", "ACTIONNAIRE.Actionnaire_id")
            .select(
                "ACTIONNAIRE.Nom as NomActionnaire",
                "CONTRAT_ACTIONNAIRE.Pourcentage",
                "CONTRAT_ACTIONNAIRE.Date_contrat"
            )
            .where("CONTRAT_ACTIONNAIRE.Entreprise_id", entrepriseID);

        return contrats;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des contrats :", error);
        return [];
    }
}
async function getContratsByActionnaire(actionnaireID) {
    try {
        const contrats = await knex("CONTRAT_ACTIONNAIRE")
            .where("Actionnaire_id", actionnaireID)
            .select("Entreprise_id", "Pourcentage", "Date_contrat");
        return contrats;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des contrats :", error);
        return [];
    }
}
async function getContratsByActionnaire(actionnaireID) {
    try {
        const contrats = await knex("CONTRAT_ACTIONNAIRE")
            .where("Actionnaire_id", actionnaireID)
            .select("Entreprise_id", "Pourcentage", "Date_contrat");
        return contrats;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des contrats :", error);
        return [];
    }
}





module.exports = {
    getActionnairesByEntreprise,
    ajouterActionnaire,
    retirerActionnaire,
    creerContratActionnaire,
    getContratsByEntreprise,
    getContratsByActionnaire
};
