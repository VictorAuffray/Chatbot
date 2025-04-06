const limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require("../modele/entrepriseModel");

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

module.exports = async function creationEntreprise() {
    while (true) {
        console.log("\n📌 Création d'une nouvelle entreprise");
        console.log("1️⃣ Continuer la création");
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
        
        const nom = prompt("Quel est le nom de votre entreprise ? ");
        const siege_social = prompt("Où est le siège social ? ");
        
        let date_creation;
        do {
            date_creation = prompt("Quelle est la date de création ? (JJ/MM/AAAA) ");
            if (!isValidDate(date_creation)) {
                console.log("❌ La date doit être sous le format JJ/MM/AAAA.");
            }
        } while (!isValidDate(date_creation));
        
        const chiffre_affaire = prompt("Quel est le chiffre d'affaire estimé ? ");

        let statut;
        do {
            statut = prompt("Quel est le statut de l'entreprise ? (Micro-Entreprise/EI/EIRL/EURL/SARL/SA/SAS/SASU/SNC/SCS/SCA/SCOP/SCI/SCP/SEL) ");
            if (!isValidStatus(statut)) {
                console.log("❌ Statut invalide ! Veuillez choisir un statut parmi la liste donnée.");
            }
        } while (!isValidStatus(statut));

        const secteur_id = prompt("Quel est l'identifiant du secteur d'activité ? ");
        const nombre_employes = prompt("Combien d'employés ? ");

        let email;
        do {
            email = prompt("Quel est l'email de contact ? ");
            if (!isValidEmail(email)) {
                console.log("❌ L'email doit être valide et se terminer par .com ou .fr.");
            }
        } while (!isValidEmail(email));

        let telephone;
        do {
            telephone = prompt("Quel est le numéro de téléphone ? ");
            if (!isValidPhone(telephone)) {
                console.log("❌ Le numéro de téléphone doit contenir exactement 10 chiffres.");
            }
        } while (!isValidPhone(telephone));

        await db.createEntreprise(nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone);
        console.log("✅ Votre entreprise a été créée avec succès !");
    }
};
