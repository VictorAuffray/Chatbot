const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createEntreprise(nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone) {
  return await knex('entreprise').insert({ nom, siege_social, date_creation, chiffre_affaire, statut, secteur_id, nombre_employes, email, telephone });
}

// Read
async function getAllEntreprises() {
  return await knex.select().from('entreprise');
}

async function getEntrepriseById(id) {
  return await knex('entreprise').where({ entreprise_id: id }).first();
}

// Update
async function updateEntreprise(id, updates) {
  return await knex('entreprise').where({ entreprise_id: id }).update(updates);
}

// Delete
async function deleteEntreprise(id) {
  return await knex('entreprise').where({ entreprise_id: id }).del();
}

module.exports = {
  createEntreprise,
  getAllEntreprises,
  getEntrepriseById,
  updateEntreprise,
  deleteEntreprise
};
