import { useState } from 'react'
import { colisDemo, type Colis, type Statut } from '../data/colis'
import { points } from '../data/points'
import { useLangue } from '../i18n'
import { formaterDateCourte, formaterDateHeure } from '../utils/date'

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
  const { t, codeIntl } = useLangue()
  const [saisie, setSaisie] = useState(numero)
  const [erreur, setErreur] = useState(false)

  const suivre = () => {
    // Tolère les espaces et saisies en minuscules.
    const propre = saisie.trim().replace(/\s+/g, '').toUpperCase()
    const trouve = colisDemo.find((c) => c.numero === propre)
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
          onKeyDown={(e) => e.key === 'Enter' && suivre()}
          placeholder={t('suivi.placeholder')}
          aria-label={t('suivi.placeholder')}
          inputMode="numeric"
        />
        <button onClick={suivre}>{t('suivi.bouton')}</button>
      </div>
      {erreur && <p className="erreur">{t('suivi.inconnu')}</p>}

      <div className="carte-bloc suivi-carte">
        <p className="muted suivi-colis">{t('suivi.de', { expediteur: colis.expediteur, numero: colis.numero })}</p>

        <ol className="frise">
          {etapes.map((s, i) => {
            if (i > indexActuel) {
              return (
                <li key={s}>
                  {t(cleStatut[s])}
                  {s === 'pret-au-retrait' && colis.statut !== 'retire' && (
                    <div className="muted">{t('suivi.dateEstimee', { date: formaterDateCourte(colis.dateDisponible, codeIntl) })}</div>
                  )}
                </li>
              )
            }
            const evt = [...colis.evenements].reverse().find((e) => e.statut === s)
            return (
              <li key={s} className="fait">
                {t(cleStatut[s])}
                {evt && (
                  <div className="muted">{t('suivi.lieu', { lieu: evt.lieu, date: formaterDateHeure(evt.dateISO, codeIntl) })}</div>
                )}
              </li>
            )
          })}
        </ol>

        {point && <p className="muted">{t('suivi.point')} <strong>{point.nom}</strong></p>}
      </div>

      <button className="principal" onClick={onVoirCarte}>{t('suivi.voirPoints')}</button>
    </section>
  )
}
