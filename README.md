# FM Monorepo

## Setup du projet

Commencer par cloner le repo :

```bash
git clone git@github.com:fm-apps/fm-apps.git
```

### Installer les dépendances

Vérifier que vous avez bien la version de node indiquée dans le fichier `package.json` puis installer les dépendances :

```bash
npm install
```

### Création du conteneur de la base de données

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
- Insérer les données initiales

### Démarrage du projet

Pour démarrer le projet, vous pouvez utiliser la commande suivante :

```bash
npm run dev
```

La commande va lancer les applications contenus dans le dossier `apps` et le serveur de développement de turbo.

## Apps

- `fm-api` : Serveur express qui permet d'accéder aux requêtes trpc.
- `fm-panel` : Application vue 3 qui permet de gérer l'inventaire et l'adminsitration du contexte Friterie Mollien
- `fm-orders` : Application vue 3 qui permet de gérer les commandes en cours pour les cuisiniers.
- `fm-customers` : Application Nuxt qui permet de gérer les commandes des clients.

## Packages

- `@fm-apps/toolkit` : Package de configuration pour linting, formatting, etc.
- `@fm-apps/db` : Package de configuration pour la base de données.
- `@fm-apps/trpc` : Package de configuration pour les requêtes trpc.

## Outils de développement

### Linter et formatter

Pour lancer le linter sans corriger les erreurs, vous pouvez utiliser la commande suivante :

```bash
npm run lint
```

Pour lancer le linter avec la correction des erreurs, vous pouvez utiliser la commande suivante :

```bash
npm run lint:fix
```

Pour formater le code, vous pouvez utiliser la commande suivante :

```bash
npm run format
```

Pour vérifier les types, vous pouvez utiliser la commande suivante :

```bash
npm run type-check
```

### Commits

Pour les commits un githook est présent et s'assure de la qualité du commit message, nous utilisons le format suivant :

```
<type>(<scope>:<subscope>): <description>
```

La liste des types suit celle du conventional commit angular et les scopes correspondent aux packages et apps du monorepo. Vous trouverez leur définition dans `packages/toolkit/commitlint.config.js`.

Le subscore est libre et permet de détailler un composant du scope. Par exemple (`api:orders`) pour indiquer que le commit concerne la partie orders de l'api.

### Ajouts de nouvelles requêtes trpc

Pour ajouter une nouvelle requête trpc ou un nouveau router il faut modifier le package `@fm-apps/trpc` et ajouter le nouveau router dans le fichier `src/server/routers/index.ts`. Vous pouvez ensuite le configurer en vous basant sur les exemples déjà présents.

> Attention il n'est normalement pas nécessaire de modifier l'app `fm-api`. ELle ne sert qu'à instancier un serveur trpc et à l'exposer. Sauf cas exceptionnel vous ne toucherez pas à cette application.

### Utilisation de prisma

Si vous avez modifié votre schéma prisma, vous pouvez appliquer les changements à la base de données avec la commande suivante :

```bash
npm run db:migrate
```

> Durant la phase de développement, vous pouvez aussi utiliser la commande push. Cependant attention cette commande ne crée pas les fichiers de migration.

```bash
npm run db:push
```

### Utilisation de PrimeVue

Les applications Vue3 et Nuxt du repose se basent sur PrimeVue. Pour utiliser les composants de PrimeVue, vous devez préfixer vos composants avec `PrimeNomDeMonComposant`. Par exemple pour utiliser le composant `Button`, vous devez l'importer comme ceci :

```vue  
<template>
  <PrimeButton label="Mon bouton" />
</template>
```