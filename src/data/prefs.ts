// Préférences de démonstration persistées dans localStorage (sans compte utilisateur).
import { useSyncExternalStore } from 'react'

const cle = 'gls-relais-prefs'

export interface Prefs {
  pointFavori: string | null
}

const prefsInitiales: Prefs = { pointFavori: null }

let prefs: Prefs = lire()
const ecouteurs = new Set<() => void>()

function lire(): Prefs {
  try {
    const brut = localStorage.getItem(cle)
    if (!brut) return prefsInitiales
    const objet = JSON.parse(brut) as Partial<Prefs>
    return { pointFavori: typeof objet.pointFavori === 'string' ? objet.pointFavori : null }
  } catch {
    // Stockage indisponible ou corrompu : valeurs par défaut.
    return prefsInitiales
  }
}

function notifier() {
  for (const ecouter of ecouteurs) ecouter()
}

export function setPointFavori(id: string | null) {
  prefs = { ...prefs, pointFavori: id }
  try {
    localStorage.setItem(cle, JSON.stringify(prefs))
  } catch {
    // Non bloquant pour la démo.
  }
  notifier()
}

function abonner(ecouter: () => void) {
  ecouteurs.add(ecouter)
  return () => ecouteurs.delete(ecouter)
}

function snapshot() {
  return prefs
}

export function usePrefs(): Prefs {
  return useSyncExternalStore(abonner, snapshot, snapshot)
}
