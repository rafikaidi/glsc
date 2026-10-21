import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { points } from '../data/points'
import { useLangue } from '../i18n'

type Mode = 'relais' | 'domicile'
type Poids = 'p1' | 'p5' | 'p10'

// Tarifs FICTIFS en euros, pour la démonstration.
const tarifBase: Record<Mode, number> = { relais: 4.9, domicile: 7.9 }
const surcharge: Record<Poids, number> = { p1: 0, p5: 2, p10: 4 }

export function EnvoiScreen() {
  const { t } = useLangue()
  const [destinataire, setDestinataire] = useState('')
  const [mode, setMode] = useState<Mode>('relais')
  const [poids, setPoids] = useState<Poids>('p1')
  const [pointId, setPointId] = useState(points[0].id)
  const [erreur, setErreur] = useState(false)
  const [numero, setNumero] = useState<string | null>(null)

  const prix = (tarifBase[mode] + surcharge[poids]).toFixed(2).replace('.', ',')

  const creer = () => {
    if (!destinataire.trim() || (mode === 'relais' && !pointId)) {
      setErreur(true)
      return
    }
    setErreur(false)
    setNumero(`GLS-TLS-${Math.floor(1000 + Math.random() * 9000)}`)
  }

  if (numero) {
    return (
      <section>
        <h1>{t('envoi.ok')}</h1>
        <div className="carte-bloc qr">
          <QRCodeSVG value={numero} size={180} />
          <p>{t('envoi.numero')} : <strong>{numero}</strong></p>
        </div>
        <button className="principal" onClick={() => setNumero(null)}>{t('envoi.nouveau')}</button>
      </section>
    )
  }

  return (
    <section>
      <h1>{t('envoi.titre')}</h1>

      <label className="champ">
        {t('envoi.destinataire')}
        <input value={destinataire} onChange={(e) => setDestinataire(e.target.value)} />
      </label>

      <fieldset className="champ">
        <legend>{t('envoi.type')}</legend>
        <label className="ligne-toggle">
          <span>{t('envoi.relais')}</span>
          <input type="radio" name="mode" checked={mode === 'relais'} onChange={() => setMode('relais')} />
        </label>
        <label className="ligne-toggle">
          <span>{t('envoi.domicile')}</span>
          <input type="radio" name="mode" checked={mode === 'domicile'} onChange={() => setMode('domicile')} />
        </label>
      </fieldset>

      {mode === 'relais' && (
        <label className="champ">
          {t('envoi.choisirPoint')}
          <select value={pointId} onChange={(e) => setPointId(e.target.value)}>
            {points.map((p) => (
              <option key={p.id} value={p.id} disabled={p.capacite === 'pleine'}>{p.nom}</option>
            ))}
          </select>
        </label>
      )}

      <label className="champ">
        {t('envoi.poids')}
        <select value={poids} onChange={(e) => setPoids(e.target.value as Poids)}>
          <option value="p1">{t('envoi.p1')}</option>
          <option value="p5">{t('envoi.p5')}</option>
          <option value="p10">{t('envoi.p10')}</option>
        </select>
      </label>

      <p className="muted">{t('envoi.tarif', { prix })}</p>
      {erreur && <p className="erreur">{t('envoi.erreur')}</p>}

      <button className="principal" onClick={creer}>{t('envoi.creer')}</button>
    </section>
  )
}
