// Données FICTIVES : colis de démonstration. Numéros de test : 78541239087654 et 78541239087655.
import { dansNJoursISO, ilYaDeuxJoursISO } from '../utils/date'

export type Statut = 'pris-en-charge' | 'en-transit' | 'pret-au-retrait' | 'retire'

export interface Evenement {
  dateISO: string
  statut: Statut
  lieu: string
}

export interface Colis {
  numero: string
  expediteur: string
  statut: Statut
  pointId: string
  dateDisponible: string // ISO, date de mise à disposition au point
  joursPourRetirer: number
  evenements: Evenement[]
}

export const colisDemo: Colis[] = [
  {
    numero: '78541239087654',
    expediteur: 'Boutique en ligne (fictive)',
    statut: 'pret-au-retrait',
    pointId: 'p3',
    dateDisponible: ilYaDeuxJoursISO(),
    joursPourRetirer: 7,
    evenements: [
      { dateISO: ilYaDeuxJoursISO(8), statut: 'pris-en-charge', lieu: 'Hub Toulouse (démo)' },
      { dateISO: ilYaDeuxJoursISO(14), statut: 'en-transit', lieu: 'Centre tri Ramonville (démo)' },
      { dateISO: ilYaDeuxJoursISO(), statut: 'pret-au-retrait', lieu: 'Relais Carmes (démo)' },
    ],
  },
  {
    numero: '78541239087655',
    expediteur: 'Vendeur C2C (fictif)',
    statut: 'en-transit',
    pointId: 'p1',
    dateDisponible: dansNJoursISO(1),
    joursPourRetirer: 7,
    evenements: [
      { dateISO: ilYaDeuxJoursISO(9), statut: 'pris-en-charge', lieu: 'Hub Bordeaux (démo)' },
      { dateISO: dansNJoursISO(0, 8), statut: 'en-transit', lieu: 'Centre tri Toulouse (démo)' },
    ],
  },
]

export const etapesStatut: { statut: Statut; libelle: string }[] = [
  { statut: 'pris-en-charge', libelle: 'Pris en charge' },
  { statut: 'en-transit', libelle: 'En transit' },
  { statut: 'pret-au-retrait', libelle: 'Prêt au retrait' },
  { statut: 'retire', libelle: 'Retiré' },
]
