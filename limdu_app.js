var limdu = require('limdu'); 
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./entrepriseModel');

function isValidEmail(email) {
    return email.match(/^[\w.-]+@[\w.-]+\.(com|fr)$/i);
}

function isValidPhone(phone) {
    return phone.match(/^\d{10}$/);
}

function isValidDate(date) {
    return date.match(/^\d{2}\/\d{2}\/\d{4}$/);
}

function isValidStatus(status) {
    const validStatuses = ["Micro-Entreprise", "EI", "EIRL", "EURL", "SARL", "SA", "SAS", "SASU", "SNC", "SCS", "SCA", "SCOP", "SCI", "SCP", "SEL"];
    return validStatuses.includes(status);
}

(async function() {

    console.log("Bonjour, je vais vous aider à créer votre entreprise.");

    var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
    });

    var WordExtractor = function(input, features) {
        input.split(" ").forEach(function(word) {
            features[word] = 1;
        });
    };

    var intentClassifier = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifier.trainBatch([
        { input: "Je veux créer une entreprise", output: "creation" },
        { input: "Aide-moi à créer ma société", output: "creation" },
        { input: "Je veux enregistrer une startup", output: "creation" },
        { input: "Créer une entreprise", output: "creation" }
    ]);

    while (true) { 
        const response = prompt("Que souhaitez-vous faire ? (Créer une entreprise / Quitter) ");
        predicted_response = intentClassifier.classify(response);

        if (predicted_response[0] === "creation") {
            const nom = prompt("Quel est le nom de votre entreprise ? ");
            const siege_social = prompt("Où est le siège social ? ");
            
            let date_creation;
            do {
                date_creation = prompt("Quelle est la date de création ? (JJ/MM/AAAA) ");
                if (!isValidDate(date_creation)) {
                    console.log("La date doit être sous le format JJ/MM/AAAA.");
                }
            } while (!isValidDate(date_creation));
            
            const chiffre_affaire = prompt("Quel est le chiffre d'affaire estimé ? ");

            let statut;
            do {
                statut = prompt("Quel est le statut de l'entreprise ? (Micro-Entreprise/EI/EIRL/EURL/SARL/SA/SAS/SASU/SNC/SCS/SCA/SCOP/SCI/SCP/SEL) ");
                if (!isValidStatus(statut)) {
                    console.log("Statut invalide ! Veuillez choisir un statut parmi la liste donnée.");
                }
            } while (!isValidStatus(statut));

            const secteur_id = prompt("Quel est l'identifiant du secteur d'activité ? ");
            const nombre_employes = prompt("Combien d'employés ? ");

            let email;
            do {
                email = prompt("Quel est l'email de contact ? ");
                if (!isValidEmail(email)) {
                    console.log("L'email doit se terminer par .com ou .fr et être valide.");
                }
            } while (!isValidEmail(email));

            let telephone;
            do {
                telephone = prompt("Quel est le numéro de téléphone ? ");
                if (!isValidPhone(telephone)) {
                    console.log("Le numéro de téléphone doit contenir exactement 10 chiffres.");
                }
            } while (!isValidPhone(telephone));

            await db.createEntreprise(nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone);
            console.log("✅ Votre entreprise a été créée avec succès !");
        } 
        else if (response.toLowerCase() === "quitter") {
            console.log("👋 Merci d'avoir utilisé le service. À bientôt !");
            break; 
        } 
        else {
            console.log("Je ne comprends pas votre demande. Veuillez reformuler.");
        }
    }

})();
