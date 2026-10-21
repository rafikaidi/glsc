// Données FICTIVES : colis de démonstration. Numéros de test : GLS-TLS-0001 et GLS-TLS-0002.
export type Statut = 'pris-en-charge' | 'en-transit' | 'pret-au-retrait' | 'retire'

export interface Colis {
  numero: string
  expediteur: string
  statut: Statut
  pointId: string
  dateDisponible: string // ISO, date de mise à disposition au point
  joursPourRetirer: number
}

export const colisDemo: Colis[] = [
  {
    numero: 'GLS-TLS-0001',
    expediteur: 'Boutique en ligne (fictive)',
    statut: 'pret-au-retrait',
    pointId: 'p3',
    dateDisponible: '2026-10-19T10:00:00',
    joursPourRetirer: 7,
  },
  {
    numero: 'GLS-TLS-0002',
    expediteur: 'Vendeur C2C (fictif)',
    statut: 'en-transit',
    pointId: 'p1',
    dateDisponible: '2026-10-22T10:00:00',
    joursPourRetirer: 7,
  },
]

export const etapesStatut: { statut: Statut; libelle: string }[] = [
  { statut: 'pris-en-charge', libelle: 'Pris en charge' },
  { statut: 'en-transit', libelle: 'En transit' },
  { statut: 'pret-au-retrait', libelle: 'Prêt au retrait' },
  { statut: 'retire', libelle: 'Retiré' },
]
