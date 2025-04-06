const knex = require('knex')(require('../knexfile')['development']);

async function createContrat(employeId, typeContrat, dateDebut, dateFin, salaire) {
  return await knex('contrat').insert({ employe_id: employeId, type_contrat: typeContrat, date_debut: dateDebut, date_fin: dateFin, salaire });
}

async function getAllContrats() {
  return await knex.select().from('contrat');
}

async function getContratById(id) {
  return await knex('contrat').where({ contrat_id: id }).first();
}

async function updateContrat(id, updates) {
  return await knex('contrat').where({ contrat_id: id }).update(updates);
}

async function deleteContrat(id) {
  return await knex('contrat').where({ contrat_id: id }).del();
}

module.exports = {
  createContrat,
  getAllContrats,
  getContratById,
  updateContrat,
  deleteContrat
};