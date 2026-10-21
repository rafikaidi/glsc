import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { LogoRelaisColis } from '../components/Logo'
import { points, type TypePoint } from '../data/points'
import { useLangue } from '../i18n'

const couleurs: Record<TypePoint, string> = {
  GLS: '#003b71',
  Consigne: '#2e7d32',
  'Ex-Relais Colis': '#e65100',
}

interface Props {
  pointChoisiId: string | null
  onChoisir: (id: string) => void
}

export function CarteScreen({ pointChoisiId, onChoisir }: Props) {
  const { t } = useLangue()

  return (
    <section>
      <h1>{t('carte.titre')}</h1>
      <p className="reseau-repris">
        <LogoRelaisColis hauteur={56} /> <span className="muted">{t('carte.reseau')}</span>
      </p>

      <MapContainer center={[43.6045, 1.4442]} zoom={13} className="carte" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={p.id === pointChoisiId ? 12 : 8}
            pathOptions={{ color: couleurs[p.type], fillColor: couleurs[p.type], fillOpacity: 0.9 }}
          >
            <Popup>{p.nom}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="legende">
        {(Object.keys(couleurs) as TypePoint[]).map((type) => (
          <span key={type}>
            <i style={{ background: couleurs[type] }} /> {type}
          </span>
        ))}
      </div>

      <ul className="liste-points">
        {points.map((p) => (
          <li key={p.id} className={p.id === pointChoisiId ? 'choisi' : ''}>
            <div>
              <strong>{p.nom}</strong>
              <div className="muted">
                {p.adresse} · {p.horaires} · {t('carte.capacite')} {t(`cap.${p.capacite}`)}
              </div>
            </div>
            <button
              onClick={() => onChoisir(p.id)}
              disabled={p.capacite === 'pleine'}
              aria-label={t('carte.choisirAria', { nom: p.nom })}
            >
              {p.capacite === 'pleine' ? t('carte.complet') : t('carte.choisir')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
