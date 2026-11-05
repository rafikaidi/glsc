import { createContext, useContext, useState, type ReactNode } from 'react'
import { dictionnaires, fr, type Langue } from './i18n/dictionnaires'

export type { Langue }

type Traduire = (cle: string, vars?: Record<string, string | number>) => string

interface ContexteLangue {
  langue: Langue
  codeIntl: string
  setLangue: (langue: Langue) => void
  t: Traduire
  jours: (n: number) => string
}

const Contexte = createContext<ContexteLangue | null>(null)

const cleStockage = 'gls-relais-langue'

function langueInitiale(): Langue {
  try {
    const sauvee = localStorage.getItem(cleStockage)
    if (sauvee === 'fr' || sauvee === 'it' || sauvee === 'nl') return sauvee
  } catch {
    // Stockage indisponible (navigation privée) : on garde la langue par défaut.
  }
  return 'fr'
}

export function LangueProvider({ children }: { children: ReactNode }) {
  const [langue, setLangueState] = useState<Langue>(langueInitiale)

  const setLangue = (nouvelle: Langue) => {
    setLangueState(nouvelle)
    try {
      localStorage.setItem(cleStockage, nouvelle)
    } catch {
      // Préférence non mémorisée : sans conséquence pour la démo.
    }
  }

  const t: Traduire = (cle, vars) => {
    const modele = dictionnaires[langue][cle] ?? fr[cle] ?? cle
    if (!vars) return modele
    return Object.entries(vars).reduce((texte, [nom, valeur]) => texte.replace(`{${nom}}`, String(valeur)), modele)
  }

  const jours = (n: number) => (n <= 1 ? t('jours.un') : t('jours.n', { n }))

  return <Contexte.Provider value={{ langue, codeIntl: langue, setLangue, t, jours }}>{children}</Contexte.Provider>
}

export function useLangue(): ContexteLangue {
  const contexte = useContext(Contexte)
  if (!contexte) throw new Error('useLangue doit être utilisé dans LangueProvider')
  return contexte
}
