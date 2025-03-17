var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./entrepriseModel');

(async function() {

	console.log("Bonjour, je vais vous aider à créer votre entreprise.");

	// Définition du classifieur
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

	// Entraînement du classifieur
	intentClassifier.trainBatch([
		{ input: "Je veux créer une entreprise", output: "creation" },
		{ input: "Aide-moi à créer ma société", output: "creation" },
		{ input: "Je veux enregistrer une startup", output: "creation" },
		{ input: "Créer une entreprise", output: "creation" }
	]);

	const response = prompt("Que souhaitez-vous faire ? ");
	predicted_response = intentClassifier.classify(response);

	if (predicted_response[0] === "creation") {
		const nom = prompt("Quel est le nom de votre entreprise ? ");
		const siege_social = prompt("Où est le siège social ? ");
		const date_creation = prompt("Quelle est l'année de création ? ");
		const chiffre_affaire = prompt("Quel est le chiffre d'affaire estimé ? ");
		const statut = prompt("Quel est le statut de l'entreprise ? (Active/Inactif) ");
		const secteur_id = prompt("Quel est l'identifiant du secteur d'activité ? ");
		const nombre_employes = prompt("Combien d'employés ? ");
		const email = prompt("Quel est l'email de contact ? ");
		const telephone = prompt("Quel est le numéro de téléphone ? ");

		await db.createEntreprise(nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone);
		console.log("Votre entreprise a été créée avec succès !");
	} else {
		console.log("Je ne comprends pas votre demande. Veuillez reformuler.");
	}

})();
