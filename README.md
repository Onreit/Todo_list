# Todo List

## Doc

#### Initialisation de la base

On va commencer par créer un utilisateur et une nouvelle base de données :

- Se connecter à la base avec psql en tant que super utilisteur : `sudo -i -u postgres psql`.
  On devrait se retrouver avec une invite de commande qui ressemble à `postgres=#`

- Créer un utilisateur : `CREATE USER nomDuLutilisateur WITH LOGIN PASSWORD 'motDePasse';`

- Créer une base de donnée : `CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;` puis `ctrl + D` pour quitter psql

- Importer les données : `psql -U numUtilisateur -d nomBaseDeDonnees -f back/data/table.sql`

#### Configuration de l'environnement

Pour permettre à notre backend de se connecter à la base de données, nous avons besoin de créer un fichier `.env`. Un fichier d'exemple est disponible. Attention à placer ce fichier `.env` **dans le dossier `back`**, et non pas à la racine du projet.

#### Démarrer l'API

Pour démarrer l'API :

- Se déplacer dans le dossier back :

  - `cd back`

- Installer les dépendances :

  - `npm install`

- Puis démarrer le serveur Node.js
  - `npm run start`

#### Lancer le front

Ouvrir le fichier HTML dans un navigateur ou bien lancer un `Live-Server` à l'aide de VSCode.
