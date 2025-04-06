const knex = require('knex')(require('./knexfile')['development']);

async function createTables() {
  try {
    const exists = await knex.schema.hasTable('Entreprise');
    if (!exists) {
    await knex.schema.createTable('CLIENT', table => {
      table.increments('Client_id').primary();
      table.string('Nom');
      table.integer('Contact_id');
    });

    await knex.schema.createTable('CONTRAT', table => {
      table.increments('Contrat_id').primary();
      table.integer('Entreprise_id').unsigned().references('entreprise_id').inTable('ENTREPRISE').onDelete('CASCADE');
      table.integer('Actionnaire_id').unsigned().references('Actionnaire_id').inTable('ACTIONNAIRE').onDelete('CASCADE');
      table.date('Date_contrat').notNullable();
      table.string('Status'); 
      table.float('Pourcentage'); 
  });
  
  
  await knex.schema.createTable('CONTRAT_ACTIONNAIRE', table => {
    table.increments('Contrat_id').primary(); // Identifiant du contrat
    table.integer('Entreprise_id').references('entreprise_id').inTable('ENTREPRISE').notNullable(); // Référence à l'entreprise
    table.integer('Actionnaire_id').references('Actionnaire_id').inTable('ACTIONNAIRE').notNullable(); // Référence à l'actionnaire
    table.float('Pourcentage').notNullable(); // Pourcentage de l'actionnaire dans le contrat
    table.date('Date_contrat').notNullable(); // Date de signature du contrat
});




    await knex.schema.createTable('PARTENAIRE', table => {
      table.increments('Partenaire_id').primary();
      table.string('Status');
      table.string('Nom');
      table.integer('Contrat_id').references('Contrat_id').inTable('CONTRAT');
    });

    await knex.schema.createTable('ENTREPRISE', table => {
      table.increments('entreprise_id').primary();
      table.string('Nom');
      table.string('Siege_social');
      table.integer('Date_creation');
      table.integer('Chiffre_affaire');
      table.integer('Employe_id').references('Employe_id').inTable('EMPLOYE');
      table.integer('Partenaire_id').references('Partenaire_id').inTable('PARTENAIRE');
      table.string('Statut');
      table.integer('Secteur_id');
      table.integer('Nombre_employes');
      table.string('Email');
      table.string('Telephone');
    });

    await knex.schema.createTable('ACTIONNAIRE', table => {
      table.increments('actionnaire_id').primary();
      table.string('Nom').notNullable();
  });

    await knex.schema.createTable('ACTIONNAIRE_ENTREPRISE', table => {
      table.increments('Actionnaire_id').primary();
      table.string('Actionnaire_nom'); 
      table.integer('Entreprise_id').references('Entreprise_id').inTable('ENTREPRISE');
      table.decimal('Pourcentage', 5, 2);
    });

    await knex.schema.createTable('SECTEUR', table => {
      table.increments('Secteur_id').primary();
      table.string('Nom');
    });

    await knex.schema.createTable('PROJET', table => {
      table.increments('Projet_id').primary();
      table.string('Nom');
      table.text('Description');
      table.integer('Date_debut');
      table.integer('Date_fin');
    });
    


    
    console.log('Toutes les tables ont été créées avec succès.');
  }
    else{
      console.log('Les tables existe déjà.');}
  } catch (error) {
    console.error('Erreur lors de la création des tables :', error);
  } finally {
    await knex.destroy();
  }
}

createTables();
