// Facteurs d'émission FICTIFS, en kg de CO2e par km parcouru.
// À remplacer par des valeurs sourcées (ex. base carbone ADEME) avant toute communication.
export type ModeEvite = 'voiture' | 'transport' | 'marche'

export const facteurs: Record<ModeEvite, number> = {
  voiture: 0.22,
  transport: 0.03,
  marche: 0,
}

export interface Saisie {
  distanceKm: number // distance à sens unique entre le domicile et le point relais
  mode: ModeEvite
  colisParAn: number
  dejaSurLeTrajet: boolean // le client passe déjà par ce point : aucun trajet dédié évité
}

export interface Resultat {
  kgParAn: number
  kmVoitureEquivalents: number
}

export function calculerCo2Evite(saisie: Saisie): Resultat {
  if (saisie.dejaSurLeTrajet) return { kgParAn: 0, kmVoitureEquivalents: 0 }

  const kgParAn = saisie.distanceKm * 2 * facteurs[saisie.mode] * saisie.colisParAn
  return { kgParAn, kmVoitureEquivalents: kgParAn / facteurs.voiture }
}
