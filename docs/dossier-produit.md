# Dossier produit : GLS Relais (prototype, Toulouse)

> Projet de démonstration. Données fictives. Hypothèse : le réseau Relais Colis est intégré à GLS (opération annoncée, finalisation non confirmée à la date de rédaction).

## 1. Problème
Le client qui attend un colis en point relais doit jongler entre plusieurs informations : où est le point, quand il ferme, si le colis est arrivé, combien de temps il a pour le retirer. Aujourd'hui, ces informations sont dispersées, et le parcours de retrait n'est pas guidé.

## 2. Constat concurrentiel
- **Mondial Relay** : application soignée, notifications, interaction avec les consignes, partenariats forts (Vinted, Décathlon, Lidl).
- **GLS** : une application existe (GLS Connect), mais l'expérience de retrait et la carte du réseau sont à renforcer. À vérifier : notes, avis et fonctions de GLS Connect avant toute comparaison publique.
- **Relais Colis** : site peu évolué, réseau de points à unifier.

## 3. Persona
**Léa, 28 ans, Toulouse.** Achète en ligne et vend sur des plateformes de seconde main. Travaille au centre-ville, souvent pressée. Veut savoir où retirer son colis en moins de deux minutes, et ne pas le perdre à cause d'un délai dépassé.

## 4. Parcours cible
1. Suivre son colis (numéro, statut).
2. Choisir un point relais proche et ouvert sur une carte.
3. Recevoir un rappel quand le colis est prêt et avant expiration.
4. Retirer avec un QR code présenté au point.

## 5. Périmètre du prototype (V1)
- Écran Suivi, écran Carte, écran Retrait.
- Sélecteur de langue visuel (FR active, autres « bientôt »).
- Hors périmètre : backend, notifications push réelles, compte utilisateur, intégration API GLS.

## 6. Indicateurs de succès
| Indicateur | Définition | Pourquoi |
|---|---|---|
| Taux de retrait au premier passage | colis retirés sans relance / colis livrés en point | efficacité du réseau |
| Délai moyen de retrait | jours entre mise à disposition et retrait | satisfaction, rotation des points |
| Taux de relance | relances envoyées / colis prêts | coût opérationnel |
| Taux de colis expirés | colis non retirés à échéance | perte de valeur, litiges |
| Satisfaction (NPS) | enquête après retrait | qualité perçue |

## 7. Roadmap
- **V1 (ce prototype)** : parcours de retrait complet, données fictives.
- **V2** : données réelles via partenariat, notifications push, changement de point ou de créneau, outil pour les points relais partenaires (voir section 8).
- **V3** : promotions ciblées par partenaires, offres C2C (entre particuliers), tarification par usage.

## 8. Piste V2 stratégique : outil pour les points relais partenaires
Les 7 000 points relais sont l'actif le plus fragile du réseau. Sans commerçants motivés, la valeur du réseau baisse face à Mondial Relay. Un outil simple pour les commerçants (scan à la réception, confirmation de retrait, alertes de capacité, suivi de rémunération) fait partie de la V2 à prioriser.

## 9. Priorisation (impact / effort)
| Fonctionnalité | Impact client | Effort | Priorité |
|---|---|---|---|
| Carte unifiée des points | Élevé | Faible | V1 |
| Frise de suivi | Élevé | Faible | V1 |
| QR code de retrait | Élevé | Faible | V1 |
| Rappel avant expiration | Élevé | Moyen (push réel en V2) | V1 affiché, V2 push |
| Outil point relais partenaire | Élevé (indirect) | Élevé | V2 |
| Promotions partenaires | Moyen | Moyen | V3 |

## 10. Hypothèses à tester
- Un rappel à J-2 réduit les colis expirés davantage qu'un rappel à J-1 (test A/B en V2).
- Afficher la capacité des points réduit les déplacements vers des points complets.

## 11. Risques et limites
- Données fictives : les chiffres ne prouvent rien, ils illustrent la méthode.
- Intégration Relais Colis non finalisée à la date de rédaction : la carte pourrait ne montrer que les points GLS.
- Concurrence : GLS Connect existe déjà ; la différenciation doit être démontrée par des tests utilisateurs.
- Dépendance aux partenaires commerçants pour la qualité du service.
