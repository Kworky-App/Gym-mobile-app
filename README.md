# Gym-mobile-app

Application mobile **Gym-Kworky** développée avec [Expo](https://expo.dev/) et [React Native Reusables](https://reactnativereusables.com).

Dépôt hébergé sur l'organisation [Kworky-App](https://github.com/Kworky-App) :

| Projet | Description |
|--------|-------------|
| [Gym-mobile-app](https://github.com/Kworky-App/Gym-mobile-app) | Application mobile (ce dépôt) |
| [Gym-backend](https://github.com/Kworky-App/Gym-backend) | API backend (ASP.NET Core) |
| [Gym-client-admin](https://github.com/Kworky-App/Gym-client-admin) | Interface d'administration |

## Fonctionnalités

- Suivi des entraînements
- Programmes personnalisés
- Statistiques de progression
- Timer de repos
- Historique des séances

## Structure de l'app

Navigation par onglets (Expo Router) :

- **Accueil** — présentation et accès rapide aux fonctionnalités
- **Séances** — gestion des entraînements
- **Profil** — statistiques et paramètres utilisateur

## Prérequis

- [Node.js](https://nodejs.org/) (LTS recommandé)
- [pnpm](https://pnpm.io/)
- [Expo Go](https://expo.dev/go) sur appareil physique, ou un émulateur iOS / Android

## Démarrage

```bash
pnpm install
pnpm dev
```

Lance le serveur de développement Expo. Ensuite :

- **iOS** : `i` pour ouvrir le simulateur _(Mac uniquement)_
- **Android** : `a` pour ouvrir l'émulateur
- **Web** : `w` pour ouvrir dans le navigateur

Vous pouvez aussi scanner le QR code avec [Expo Go](https://expo.dev/go) sur votre téléphone.

## Ajouter des composants UI

```bash
npx react-native-reusables/cli@latest add [...components]
```

Exemple :

```bash
npx react-native-reusables/cli@latest add input textarea
```

## Stack technique

- [Expo Router](https://expo.dev/router) — navigation file-based
- [Nativewind](https://www.nativewind.dev/) — Tailwind CSS pour React Native
- [React Native Reusables](https://github.com/founded-labs/react-native-reusables) — composants UI
- [Lucide React Native](https://lucide.dev/) — icônes

## Déploiement

Le déploiement se fait via [Expo Application Services (EAS)](https://expo.dev/eas) :

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Updates](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

## Ressources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Nativewind Docs](https://www.nativewind.dev/)
- [React Native Reusables](https://reactnativereusables.com)
