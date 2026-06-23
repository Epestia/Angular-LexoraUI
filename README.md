# Architecture du Projet LexoraUI

Le projet **LexoraUI** est l'interface frontend de l'application **Lexora**. Il est construit avec **Angular 21** en architecture **standalone components**, avec un decoupage par couches et par fonctionnalites pour garder une separation claire entre l'affichage, la logique applicative et les appels vers l'API backend.

L'application sert d'interface utilisateur pour apprendre des langues via des **decks**, des **flashcards**, des **sessions d'etude**, des **quiz**, des **traductions** et une partie **administration**.

---

## Organisation des Dossiers

### 1. Dossier core `src/app/core` (Couche Applicative)

C'est le coeur technique de l'application. On y centralise les elements reutilisables par toutes les features.

* **`api`** : Definition des endpoints backend dans `api-endpoints.ts`.
* **`services`** : Services Angular responsables des appels HTTP et de certaines logiques metier cote client.
* **`models`** : Interfaces TypeScript representant les donnees manipulees par l'application.
* **`guards`** : Protection des routes selon l'etat de connexion et le role utilisateur.
* **`interceptors`** : Ajout automatique du token JWT dans les requetes HTTP.
* **`resolvers`** : Preparation de donnees avant le chargement de certaines pages.

### 2. Dossier features `src/app/features` (Modules Fonctionnels)

Chaque grande fonctionnalite de Lexora possede son propre dossier avec ses pages, templates et styles.

* **`auth`** : Page de connexion et gestion de l'authentification.
* **`home`** : Page d'accueil de l'application.
* **`deck`** : Liste, creation et edition des paquets de cartes.
* **`flashcards`** : Gestion des cartes d'apprentissage liees aux decks.
* **`translation`** : Gestion des traductions associees aux flashcards.
* **`translated-sentence`** : Gestion des phrases d'exemple traduites.
* **`study-session`** : Creation, liste et edition des sessions d'etude.
* **`quiz`** : Lancement de quiz et consultation des resultats.
* **`users`** : Administration des utilisateurs et des roles.

### 3. Dossier layouts `src/app/layouts` (Structure Visuelle)

Ce dossier contient les elements de mise en page globaux.

* **`main-layout`** : Layout principal contenant le `navbar`, le `footer` et le point d'affichage des pages.
* **`navbar`** : Menu dynamique construit selon l'utilisateur connecte et son role.
* **`footer`** : Pied de page de l'application.

### 4. Dossier share `src/app/shared` (Elements Partages)

On y place les outils reutilisables par plusieurs pages.

* **`pipes`** : Transformation d'affichage comme les scores, pourcentages, libelles de decks ou capitalisation.
* **`directives`** : Directives visuelles reutilisables.
* **`components`** : Emplacement prevu pour des composants generiques.
* **`utils`** : Fonctions utilitaires partagees.

### 5. Dossier environments `src/environments`

Ce dossier contient la configuration d'environnement.

* **`environment.ts`** : Configuration de developpement.
* **`environment.prod.ts`** : Configuration de production.

L'URL de l'API est actuellement definie sur :

```ts
apiUrl: 'http://localhost:8080'
```

---

## Configuration Angular

Le projet est configure dans `angular.json` sous le nom **LexoraUI**.

### Application Angular

* **Entry point navigateur** : `src/main.ts`
* **Entry point serveur** : `src/main.server.ts`
* **Styles globaux** : `src/styles.css`
* **Assets publics** : `public/`
* **Mode de rendu** : `server`
* **SSR** : Active via `src/server.ts`
* **Hydratation client** : Active avec `provideClientHydration(withEventReplay())`

### Providers principaux

Dans `app.config.ts`, on configure :

* **Router Angular** : Gestion des routes de l'application.
* **HttpClient** : Communication avec le backend.
* **AuthInterceptor** : Injection du token JWT dans les requetes.
* **PrimeNG** : Bibliotheque UI avec le theme `Aura`.
* **Hydratation SSR** : Reprise de l'application cote navigateur apres rendu serveur.

---

## Stack Technique

* **Framework** : Angular 21.2.14
* **Langage** : TypeScript 5.9
* **UI Components** : PrimeNG 21
* **Theme UI** : PrimeUIX Aura
* **Icones** : PrimeIcons
* **HTTP / Reactive** : Angular HttpClient et RxJS
* **Etat local** : Angular Signals
* **SSR** : Angular SSR avec Express
* **Graphiques** : Chart.js
* **Export PDF** : jsPDF et jsPDF AutoTable
* **Tests** : Vitest via Angular CLI
* **Package Manager** : npm 10.9.2

---

## Flux de donnees

Le frontend suit un flux clair entre les composants, les services et l'API backend.

1. L'utilisateur navigue vers une **route Angular**.
2. Le **Router** charge le composant standalone correspondant.
3. Si la route est protegee, un **Guard** verifie l'etat de connexion ou le role.
4. Le composant appelle un **Service** du dossier `core/services`.
5. Le service envoie une requete HTTP vers l'API definie dans `API_ENDPOINTS`.
6. L'**AuthInterceptor** ajoute le header `Authorization: Bearer <token>` si un token existe.
7. Le backend renvoie les donnees au format JSON.
8. Le composant met a jour l'affichage avec les donnees recues.

---

## Authentification et Securite

L'authentification repose sur un couple de tokens JWT retourne par le backend.

### Stockage local

Apres connexion, le `AuthService` stocke dans le `localStorage` :

* **`accessToken`** : Token utilise pour authentifier les requetes.
* **`refreshToken`** : Token de renouvellement.
* **`user`** : Payload decode du token d'acces.

### Etat global

Le service utilise des **Angular Signals** :

* **`user`** : Utilisateur courant.
* **`isLoggedIn`** : Etat de connexion.

### Guards disponibles

* **`authGuard`** : Autorise uniquement les utilisateurs connectes.
* **`adminGuard`** : Autorise les utilisateurs `ADMIN` et `SUPER_ADMIN`.
* **`superAdminGuard`** : Autorise uniquement les utilisateurs `SUPER_ADMIN`.

---

## Documentation des Routes - Navigation

Cette section detaille les pages principales disponibles dans LexoraUI.

---

## Routes Publiques

### 1. Accueil

* **URL** : `/`
* **Composant** : `HomeComponent`
* **Resume** : Affiche la page d'accueil de Lexora.
* **Description** : Presente les actions principales : consulter les decks, commencer une session d'etude et lancer un quiz.

### 2. Connexion

* **URL** : `/login`
* **Composant** : `Login`
* **Resume** : Authentifie un utilisateur.
* **Service utilise** : `AuthService`
* **Endpoint backend** : `/auth/login`
* **Description** : Envoie les identifiants au backend, stocke les tokens JWT et initialise l'etat utilisateur.

### 3. Creation de compte

* **URL** : `/users/create`
* **Composant** : `UserCreate`
* **Resume** : Permet de creer un nouvel utilisateur.
* **Service utilise** : `UserService`
* **Endpoint backend** : `/api/users`

---

## Routes Decks

Les routes liees aux decks sont protegees par `authGuard`.

### 1. Lister les decks

* **URL** : `/decks`
* **Composant** : `DeckComponent`
* **Resume** : Affiche les decks disponibles.
* **Services utilises** : `DeckService`
* **Endpoints backend** :
  * `GET /api/decks`
  * `GET /api/decks/me`

### 2. Creer un deck

* **URL** : `/decks/create`
* **Composant** : `DeckCreateComponent`
* **Resume** : Cree un nouveau paquet de flashcards.
* **Endpoint backend** : `POST /api/decks`

### 3. Modifier un deck

* **URL** : `/decks/edit/:id`
* **Composant** : `DeckEditComponent`
* **Resume** : Modifie un deck existant.
* **Endpoints backend** :
  * `GET /api/decks/{id}`
  * `PUT /api/decks/{id}`

### Exemple de structure `Deck`

```ts
{
  id: 1,
  title: 'Anglais debutant',
  language: 'EN',
  isPublic: false,
  status: 'PRIVATE',
  createdById: 1,
  validatedById: null,
  validationDate: null
}
```

---

## Routes Flashcards

Les flashcards representent les cartes d'apprentissage d'un deck.

### 1. Lister les flashcards d'un deck

* **URL** : `/decks/:deckId/flashcards`
* **Composant** : `FlashcardsComponent`
* **Resume** : Affiche les cartes appartenant a un deck.
* **Endpoint backend** : `GET /api/flashcards/deck/{deckId}`

### 2. Creer une flashcard

* **URL** : `/decks/:deckId/flashcards/create`
* **Composant** : `FlashcardsCreateComponent`
* **Resume** : Ajoute une carte recto/verso dans un deck.
* **Endpoint backend** : `POST /api/flashcards`

### Exemple de structure `Flashcard`

```ts
{
  id: 1,
  frontText: 'Dog',
  backText: 'Chien',
  deckId: 1
}
```

---

## Routes Traductions

Les traductions permettent d'associer une langue d'apprentissage et un texte traduit a une flashcard.

### 1. Lister les traductions

* **URL** : `/translations`
* **Composant** : `TranslationComponent`
* **Resume** : Affiche les traductions disponibles.
* **Endpoint backend** : `GET /api/translations`

### 2. Creer une traduction

* **URL** : `/translations/create`
* **Composant** : `TranslationCreateComponent`
* **Resume** : Cree une traduction liee a une flashcard.
* **Endpoint backend** : `POST /api/translations`

### Exemple de structure `Translation`

```ts
{
  id: 1,
  translatedText: 'Chien',
  learnerLanguage: 'FR',
  flashcardId: 1
}
```

---

## Routes Phrases Traduites

Les phrases traduites donnent un contexte d'utilisation aux traductions.

### 1. Lister les phrases

* **URL** : `/translated-sentences`
* **Composant** : `TranslatedSentenceComponent`
* **Resume** : Affiche les phrases traduites de l'utilisateur.
* **Endpoints backend** :
  * `GET /api/translated-sentences/my-sentences`
  * `GET /api/translated-sentences/translation/{translationId}`

### 2. Creer une phrase traduite

* **URL** : `/translated-sentences/create`
* **Composant** : `TranslatedSentenceCreate`
* **Resume** : Ajoute une phrase source et sa traduction.
* **Endpoint backend** : `POST /api/translated-sentences`

### Exemple de structure `TranslatedSentence`

```ts
{
  id: 1,
  sentence: 'My dog is happy',
  translatedSentence: 'Mon chien est heureux',
  translationId: 1
}
```

---

## Routes Sessions d'Etude

Les sessions d'etude permettent de suivre la progression de l'utilisateur sur les flashcards.

### 1. Creer une session

* **URL** : `/study-session/create`
* **Composant** : `StudySessionCreateComponent`
* **Resume** : Initialise une progression pour des flashcards.
* **Service utilise** : `userFlashcardProgressService`
* **Endpoint backend** : `POST /api/user-progress`

### 2. Lister les sessions

* **URL** : `/study-session`
* **Composant** : `StudySessionComponent`
* **Resume** : Affiche les progressions de l'utilisateur.
* **Endpoint backend** : `GET /api/user-progress/user/{userId}`

### 3. Modifier une session

* **URL** : `/study-session/edit/:id`
* **Composant** : `StudySessionEditComponent`
* **Resume** : Met a jour l'etat d'apprentissage d'une carte.
* **Endpoint backend** : `PUT /api/user-progress/{id}`

### Exemple de structure `UserFlashcardProgress`

```ts
{
  id: 1,
  userId: 1,
  flashcardId: 1,
  repetitionLevel: 2,
  timesReviewed: 4,
  known: true,
  nextReviewDate: '2026-03-01'
}
```

---

## Routes Quiz

Le module quiz permet de tester les connaissances de l'utilisateur et d'enregistrer les resultats.

### 1. Lancer un quiz

* **URL** : `/quiz`
* **Composant** : `QuizComponent`
* **Resume** : Lance un quiz a partir d'un deck et de ses flashcards.
* **Logique cote client** : Melange des cartes, comparaison des reponses et calcul du score.
* **Service utilise** : `QuizService`

### 2. Consulter les resultats

* **URL** : `/quiz/all`
* **Composant** : `QuizAllComponent`
* **Resume** : Affiche l'historique des quiz enregistres.
* **Endpoint backend** : `GET /api/quizzes`

### Exemple de structure `Quiz`

```ts
{
  id: 1,
  userId: 1,
  deckId: 1,
  attemptDate: '2026-03-01T23:11:08.443Z',
  score: 8,
  totalQuestions: 10
}
```

---

## Routes Administration

Ces routes sont visibles dans le menu uniquement selon le role de l'utilisateur.

### 1. Gestion des utilisateurs

* **URL** : `/users`
* **Composant** : `UsersComponent`
* **Guard** : `adminGuard`
* **Resume** : Liste les utilisateurs et permet certaines actions d'administration.
* **Endpoints backend** :
  * `GET /api/users`
  * `GET /api/users/{id}`
  * `DELETE /api/users/{id}`
  * `PATCH /api/users/{userId}/promote-admin`

### 2. Gestion des roles

* **URL** : `/roles`
* **Composant** : `RoleComponent`
* **Guard** : `superAdminGuard`
* **Resume** : Liste et gere les roles de l'application.
* **Endpoints backend** :
  * `GET /api/roles`
  * `GET /api/roles/{id}`
  * `GET /api/roles/name/{name}`
  * `PUT /api/roles/{id}`
  * `DELETE /api/roles/{id}`

### 3. Creation d'un role

* **URL** : `/roles/create`
* **Composant** : `RoleCreateComponent`
* **Guard** : `superAdminGuard`
* **Endpoint backend** : `POST /api/roles`

---

## Menu Principal

La barre de navigation est construite dynamiquement dans `Navbar`.

### Utilisateur non connecte

* Accueil
* Etude
* Decks
* Creer un compte
* Connexion

### Utilisateur connecte

* Accueil
* Etude
* Decks
* Quiz
* Langue
* Phrases
* Deconnexion

### Administrateur

Un utilisateur `ADMIN` ou `SUPER_ADMIN` voit aussi :

* Administration
* Users
* Roles

---

## Configuration des Endpoints

Tous les endpoints sont centralises dans `src/app/core/api/api-endpoints.ts`.

```ts
export const API_ENDPOINTS = {
  users: `${environment.apiUrl}/api/users`,
  roles: `${environment.apiUrl}/api/roles`,
  decks: `${environment.apiUrl}/api/decks`,
  flashcards: `${environment.apiUrl}/api/flashcards`,
  translations: `${environment.apiUrl}/api/translations`,
  translatedSentences: `${environment.apiUrl}/api/translated-sentences`,
  userProgress: `${environment.apiUrl}/api/user-progress`,
  study: `${environment.apiUrl}/api/study`,
  auth: {
    login: `${environment.apiUrl}/auth/login`,
  },
  quiz: `${environment.apiUrl}/api/quizzes`,
};
```

---

## Commandes du Projet

### Installer les dependances

```bash
npm install
```

### Lancer le serveur de developpement

```bash
npm start
```

L'application est disponible sur :

```bash
http://localhost:4200
```

### Compiler le projet

```bash
npm run build
```

### Compiler en mode watch

```bash
npm run watch
```

### Lancer les tests

```bash
npm test
```

### Lancer le serveur SSR apres build

```bash
npm run serve:ssr:LexoraUI
```

---

## Relation avec le Backend Lexora

LexoraUI depend du backend **Lexora** pour :

* L'authentification JWT.
* La gestion des utilisateurs et roles.
* La gestion des decks et flashcards.
* La gestion des traductions et phrases traduites.
* La progression d'apprentissage.
* L'enregistrement des resultats de quiz.

En developpement, le backend doit etre lance sur :

```bash
http://localhost:8080
```

---

## Resume

LexoraUI est une application Angular moderne organisee autour d'une architecture claire :

* **`core`** pour la logique partagee et les acces API.
* **`features`** pour les pages metier.
* **`layouts`** pour la structure globale.
* **`shared`** pour les pipes, directives et composants reutilisables.

Cette organisation permet de faire evoluer l'interface Lexora sans melanger la logique d'authentification, les appels backend, les pages fonctionnelles et les elements visuels communs.
