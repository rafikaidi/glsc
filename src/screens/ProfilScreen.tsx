import { useState } from 'react'
import { colisDemo } from '../data/colis'
import { points } from '../data/points'
import { useLangue } from '../i18n'

interface Props {
  onVoirAide: () => void
  onVoirImpact: () => void
}

export function ProfilScreen({ onVoirAide, onVoirImpact }: Props) {
  const { t } = useLangue()
  const [pointFavori, setPointFavori] = useState('p1')
  const [notifs, setNotifs] = useState({ sms: true, email: false, push: true })

  const basculer = (cle: keyof typeof notifs) => setNotifs((n) => ({ ...n, [cle]: !n[cle] }))

  return (
    <section>
      <h1>{t('profil.titre')}</h1>

      <div className="carte-bloc profil-entete">
        <div className="avatar" aria-hidden="true">LM</div>
        <div>
          <strong>Léa Martin</strong> <span className="badge">fictif</span>
          <div className="muted">{t('profil.ville')} : Toulouse</div>
        </div>
      </div>

      <div className="carte-bloc">
        <label className="champ">
          {t('profil.point')}
          <select value={pointFavori} onChange={(e) => setPointFavori(e.target.value)}>
            {points.map((p) => (
              <option key={p.id} value={p.id}>{p.nom}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="carte-bloc">
        <h2>{t('profil.notifs')}</h2>
        {(['sms', 'email', 'push'] as const).map((cle) => (
          <label key={cle} className="ligne-toggle">
            <span>{t(`profil.${cle}`)}</span>
            <input type="checkbox" checked={notifs[cle]} onChange={() => basculer(cle)} />
          </label>
        ))}
      </div>

      <div className="carte-bloc">
        <h2>{t('profil.historique')}</h2>
        <ul className="liste-simple">
          {colisDemo.map((c) => (
            <li key={c.numero}>
              <span>{c.numero}</span>
              <span className="muted">{c.expediteur}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="secondaire" onClick={onVoirImpact}>{t('profil.impact')}</button>
      <button className="secondaire" onClick={onVoirAide}>{t('profil.aide')}</button>
    </section>
  )
}
