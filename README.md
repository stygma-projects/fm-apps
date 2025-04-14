# FM Monorepo

## Setup du projet

Commencer par cloner le repo :

```bash
git clone git@github.com:fm-monorepo/fm-monorepo.git
```

### Installer les dépendances

Vérifier que vous avez bien la version de node indiquée dans le fichier `package.json` puis installer les dépendances :

```bash
npm install
```

### Créationd du conteneur de la base de données

Pour créer votre base de données il vous suffit de lancer le conteneur docker depuis le fichier `docker-compose.yml` situé dans le root du projet. Pour cela il suffit d'exécuter la commande suivante :

```bash
docker-compose up
```

Si vous avez installé docker desktop, vous pourrez désormais suivre l état du conteneur ou le lancer depuis l'application.

Pour accéder à la base de données, vous pouvez vous connecter à l'interface de votre gestionnaire de base de données et vous connecter à la base de données `fm_db` avec les identifiants suivants :

- Host : `localhost`
- Port : `3306`
- Username : `root`
- Password : `root`

De plus pour que votre application puisse accéder à la base de données, vous devez ajouter les informations de connexion dans le fichier `.env` du dossier `packages/db`.

```bash
DATABASE_URL="mysql://root:root@localhost:3306/fm_db"
```

### Initialisation de la base de données

Pour initialiser la base de données, vous pouvez utiliser la commande suivante :

```bash
npm run db:reset
```

Cette commande va :

- Créer la base de données
- Générer le client prisma
- Appliquer les migrations
- Insérer les données initiale

### Démarrage du projet

Pour démarrer le projet, vous pouvez utiliser la commande suivante :

```bash
npm run dev
```

La commande va lancer les applications contenus dans le dossier `apps` et le serveur de développement de turbo.

## Apps

### fm-api

L'application `fm-api` est un serveur express qui permet d'accéder aux requêtes `trpc`.

### fm-panel

L'application `fm-panel` est une application vue 3 qui permet de gérer l'inventaire et l'adminsitration du contexte Friterie Mollien

### fm-order

L'application `fm-order` est une application vue 3 qui permet de gérer les commandes en cours pour les cuisiniers.

### fm-customer

L'application `fm-customer` est une application Nuxt qui permet de gérer les commandes des clients.

## Utilisation de prisma

Si vous avez modifié votre schéma prisma, vous pouvez appliquer les changements à la base de données avec la commande suivante :

```bash
npm run db:migrate
```
 > Durant la phase de développement, vous pouvez aussi utiliser la commande push. Cependant attention cette commande ne crée pas les fichiers de migration.
 
 ```bash
 npm run db:push
 ```





