import { useState } from 'react'
import { colisDemo, type Colis, type Statut } from '../data/colis'
import { points } from '../data/points'
import { useLangue } from '../i18n'

interface Props {
  numero: string
  onChangerNumero: (numero: string) => void
  colis: Colis
  onVoirCarte: () => void
}

const etapes: Statut[] = ['pris-en-charge', 'en-transit', 'pret-au-retrait', 'retire']
const cleStatut: Record<Statut, string> = {
  'pris-en-charge': 'statut.pris',
  'en-transit': 'statut.transit',
  'pret-au-retrait': 'statut.pret',
  retire: 'statut.retire',
}

export function SuiviScreen({ numero, onChangerNumero, colis, onVoirCarte }: Props) {
  const { t } = useLangue()
  const [saisie, setSaisie] = useState(numero)
  const [erreur, setErreur] = useState(false)

  const suivre = () => {
    const trouve = colisDemo.find((c) => c.numero === saisie.trim().toUpperCase())
    if (trouve) {
      setErreur(false)
      onChangerNumero(trouve.numero)
    } else {
      setErreur(true)
    }
  }

  const indexActuel = etapes.indexOf(colis.statut)
  const point = points.find((p) => p.id === colis.pointId)

  return (
    <section>
      <h1>{t('suivi.titre')}</h1>
      <div className="saisie">
        <input
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          placeholder={t('suivi.placeholder')}
          aria-label={t('suivi.placeholder')}
        />
        <button onClick={suivre}>{t('suivi.bouton')}</button>
      </div>
      {erreur && <p className="erreur">{t('suivi.inconnu')}</p>}

      <div className="carte-bloc suivi-carte">
        <p className="muted suivi-colis">{t('suivi.de', { expediteur: colis.expediteur, numero: colis.numero })}</p>

        <ol className="frise">
          {etapes.map((s, i) => (
            <li key={s} className={i <= indexActuel ? 'fait' : ''}>
              {t(cleStatut[s])}
            </li>
          ))}
        </ol>

        {point && <p className="muted">{t('suivi.point')} <strong>{point.nom}</strong></p>}
      </div>

      <button className="principal" onClick={onVoirCarte}>{t('suivi.voirPoints')}</button>
    </section>
  )
}
