const limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require("./modele/entrepriseModel");
const creationEntreprise = require("./Conversation/creationEntreprise");
const modificationEntreprise = require("./Conversation/modificationEntreprise");

(async function () {
    while (true) {
        console.log("\nBonjour, que souhaitez-vous faire ?");
        console.log("1️⃣ Créer une entreprise");
        console.log("2️⃣ Modifier une entreprise");
        console.log("3️⃣ Quitter");
        
        const response = prompt("Choisissez une option (1/2/3) : ");
        
        if (response === "1") {
            console.log("Redirection vers la création de l'entreprise...");
            await creationEntreprise();
        } else if (response === "2") {
            console.log("Redirection vers la modification de l'entreprise...");
            await modificationEntreprise();
        } else if (response === "3") {
            console.log("👋 Merci d'avoir utilisé le service. À bientôt !");
            process.exit();
        } else {
            console.log("❌ Réponse invalide, veuillez choisir une option valide.");
        }
    }
})();
