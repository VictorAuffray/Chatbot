const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createEntreprise(nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone) {
    return await knex('ENTREPRISE').insert({ nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone });
}

// Read
async function getAllEntreprises() {
    return await knex.select().from('ENTREPRISE');
}

async function getEntrepriseById(id) {
    return await knex('ENTREPRISE').where({ entreprise_id: id }).first();
}

async function getEntrepriseByName(nom) {
    return await knex('ENTREPRISE').where({ Nom: nom }).first();
}

// Update
async function updateEntreprise(id, updates) {
    return await knex('ENTREPRISE').where({ entreprise_id: id }).update(updates);
}

// Delete
async function deleteEntreprise(id) {
    return await knex('ENTREPRISE').where({ entreprise_id: id }).del();
}


// entrepriseModel.js

async function getAllEntreprisesWithActionnaires() {
    return await knex('ENTREPRISE')
        .leftJoin('ACTIONNAIRE_ENTREPRISE', 'ENTREPRISE.entreprise_id', 'ACTIONNAIRE_ENTREPRISE.Entreprise_id')
        .select('ENTREPRISE.*', 'ACTIONNAIRE_ENTREPRISE.Pourcentage')
        .orderBy('ENTREPRISE.entreprise_id');
}



// Exporter les fonctions
module.exports = {
    createEntreprise,
    getAllEntreprises,
    getEntrepriseById,
    getEntrepriseByName,
    updateEntreprise,
    deleteEntreprise,
    getAllEntreprisesWithActionnaires,
};
