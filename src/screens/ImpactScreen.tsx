import { useState } from 'react'
import { calculerCo2Evite, type ModeEvite } from '../data/co2'
import { useLangue } from '../i18n'

const formatDecimal = (valeur: number) => valeur.toFixed(1).replace('.', ',')

export function ImpactScreen() {
  const { t } = useLangue()
  const [distanceKm, setDistanceKm] = useState(3)
  const [mode, setMode] = useState<ModeEvite>('voiture')
  const [colisParAn, setColisParAn] = useState(12)
  const [dejaSurLeTrajet, setDejaSurLeTrajet] = useState(false)

  const resultat = calculerCo2Evite({ distanceKm, mode, colisParAn, dejaSurLeTrajet })

  return (
    <section>
      <h1>{t('impact.titre')}</h1>
      <p>{t('impact.intro')}</p>

      <div className="carte-bloc">
        <label className="champ">
          {t('impact.distance')}
          <input
            type="number"
            min={0}
            max={50}
            step={0.5}
            value={distanceKm}
            onChange={(e) => setDistanceKm(Math.max(0, Number(e.target.value)))}
          />
        </label>

        <label className="champ">
          {t('impact.mode')}
          <select value={mode} onChange={(e) => setMode(e.target.value as ModeEvite)}>
            <option value="voiture">{t('impact.voiture')}</option>
            <option value="transport">{t('impact.transport')}</option>
            <option value="marche">{t('impact.marche')}</option>
          </select>
        </label>

        <label className="champ">
          {t('impact.colis')}
          <input
            type="number"
            min={1}
            max={200}
            value={colisParAn}
            onChange={(e) => setColisParAn(Math.max(1, Number(e.target.value)))}
          />
        </label>

        <label className="ligne-toggle">
          <span>{t('impact.dejaSurTrajet')}</span>
          <input type="checkbox" checked={dejaSurLeTrajet} onChange={() => setDejaSurLeTrajet((v) => !v)} />
        </label>
      </div>

      <div className="carte-bloc resultat-co2">
        {dejaSurLeTrajet ? (
          <p>{t('impact.zero')}</p>
        ) : (
          <>
            <div className="grand-chiffre">{t('impact.resultat', { kg: formatDecimal(resultat.kgParAn) })}</div>
            <p className="muted">
              {t('impact.equivalent', { km: Math.round(resultat.kmVoitureEquivalents).toString() })}
            </p>
          </>
        )}
      </div>

      <p className="muted">{t('impact.groupage')}</p>
      <p className="muted">{t('impact.hypotheses')}</p>
    </section>
  )
}
