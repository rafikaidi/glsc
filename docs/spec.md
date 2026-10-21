# Spec : GLS Relais, prototype d'app client (Toulouse)

## Objectif
Prototype cliquable et installable (PWA) qui montre une solution au constat suivant : le réseau de points relais GLS, enrichi des anciens points Relais Colis, manque d'un parcours client clair (trouver un point, suivre son colis, retirer sans friction).

## Public
Destinataire B2C à Toulouse qui attend un colis et veut le retirer en point relais.

## Périmètre (3 écrans + langue)
1. **Suivi** : saisir un numéro de colis, voir la frise de statut.
2. **Carte** : points GLS, consignes et anciens points Relais Colis autour de Toulouse, avec horaires, distance et choix du point.
3. **Retrait** : colis prêt au point choisi, QR code de retrait, rappel avant expiration.
4. **Langue** : sélecteur visuel, FR active, autres langues marquées « bientôt ».

## Hors périmètre
- Pas de backend, pas d'API GLS réelle, pas de compte utilisateur.
- Pas de notifications push réelles (rappel affiché dans l'app).
- Pas de mode hors ligne, pas d'app native (PWA installable seulement).
- Pas de scraping du site GLS.

## Hypothèse de départ
Le projet suppose que le réseau Relais Colis (environ 7 000 points) est déjà intégré au réseau GLS. Le communiqué GLS annonce l'opération, mais sa finalisation est soumise au contrôle des concentrations et n'est pas confirmée. Le prototype reste valable si l'opération se conclut ; sinon, la carte n'afficherait que les points GLS.

## Données
- Points relais et colis **fictifs**, signalés comme tels dans l'interface.
- Fichiers : `src/data/points.ts` et `src/data/colis.ts`.

## Stack
React + Vite + TypeScript, Leaflet avec OpenStreetMap (sans clé), qrcode.react. Hébergement cible : GitHub Pages (non fait ici).

## Critères de réussite
- `npm run build` passe sans erreur.
- Les 3 écrans s'enchaînent avec le même colis et le même point.
- Affichage correct sur un écran de téléphone (375 px), sans défilement horizontal.
- Mention « données fictives » visible.
