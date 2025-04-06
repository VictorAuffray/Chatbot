# Chatbot de Gestion d'Entreprises

Ce projet est un chatbot conçu pour gérer des informations relatives à des entreprises et à leurs actionnaires. Il permet de créer, modifier et afficher des informations sur les entreprises et les actionnaires associés.

## Fonctionnalités

- **Création d'entreprises** : Ajoutez de nouvelles entreprises à la base de données avec des détails tels que :
  - Siège social
  - Date de création
  - Chiffre d'affaires
  - Statut juridique
  - Secteur d'activité
  - Nombre d'employés
  - Email et téléphone

- **Modification d'entreprises** : Modifiez les détails d'une entreprise existante.

- **Affichage des entreprises** : Affichez les fiches détaillées de toutes les entreprises enregistrées.

- **Gestion des actionnaires** : Ajoutez ou retirez des actionnaires d'une entreprise et affichez les contrats associés.

- **Interface utilisateur simple** : Menu basé sur la console pour une utilisation intuitive.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [Knex.js](http://knexjs.org/) pour la gestion de la base de données
- Une base de données configurée (par exemple, SQLite, PostgreSQL)

## Utilisation
- Étape 1 : Lancez le fichier migrate.js avec la commande suivante : node migrate.js
- Étape 2 : Lancez le fichier save.js pour créer des entreprises témoins : node save.js
- Étape 3 : Lancez le fichier limdu.js avec la commande suivante : limdu.js

Ensuite, vous pouvez choisir de créer une entreprise et suivre la démarche, ou modifier une entreprise existante en spécifiant son nom. Les entreprises témoins s'appellent TechCorp et GreenSolutions.

Dans la section des modifications, vous pouvez ajouter un actionnaire à l'entreprise concernée ou supprimer un actionnaire.

Enfin, vous pouvez consulter l'entreprise que vous venez de créer ou les actionnaires ajoutés en relançant le fichier save.js.
