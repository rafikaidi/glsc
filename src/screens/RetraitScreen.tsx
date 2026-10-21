import { QRCodeSVG } from 'qrcode.react'
import type { Colis } from '../data/colis'
import type { PointRelais } from '../data/points'
import { useLangue } from '../i18n'

interface Props {
  colis: Colis
  point: PointRelais | null
}

function joursRestants(colis: Colis): number {
  const ecoule = (Date.now() - new Date(colis.dateDisponible).getTime()) / 86_400_000
  return Math.max(0, Math.ceil(colis.joursPourRetirer - ecoule))
}

export function RetraitScreen({ colis, point }: Props) {
  const { t, jours } = useLangue()

  if (!point) {
    return (
      <section>
        <h1>{t('retrait.titre')}</h1>
        <p>{t('retrait.choisirPoint')}</p>
      </section>
    )
  }

  if (colis.statut !== 'pret-au-retrait') {
    return (
      <section>
        <h1>{t('retrait.titre')}</h1>
        <p>{t('retrait.pasPret', { numero: colis.numero })}</p>
      </section>
    )
  }

  const restants = joursRestants(colis)

  return (
    <section>
      <h1>{t('retrait.pret')}</h1>

      {restants <= 2 && <p className="alerte">{t('retrait.alerte', { jours: jours(restants) })}</p>}

      <p>
        {t('retrait.point')} <strong>{point.nom}</strong>
        <br />
        <span className="muted">{point.adresse} · {point.horaires}</span>
      </p>

      <div className="carte-bloc qr">
        <QRCodeSVG value={`GLS-RETRAIT|${colis.numero}|${point.id}`} size={200} />
        <p className="muted">{t('retrait.presenter')}</p>
      </div>

      <p className="muted">{t('retrait.delai', { numero: colis.numero, jours: jours(restants) })}</p>
    </section>
  )
}
