import { useEffect, useMemo, useRef, useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { LogoRelaisColis } from '../components/Logo'
import { points, type TypePoint } from '../data/points'
import { setPointFavori, usePrefs } from '../data/prefs'
import { useLangue } from '../i18n'
import { haversineKm, toulouseCentre, useGeolocate, type Coordonnees } from '../utils/distance'

const couleurs: Record<TypePoint, string> = {
  GLS: '#003b71',
  Consigne: '#2e7d32',
  'Ex-Relais Colis': '#e65100',
}

interface Props {
  pointChoisiId: string | null
  onChoisir: (id: string) => void
}

// Recentre la carte une seule fois, quand la position réelle arrive.
// Sinon chaque mise à jour GPS écrase le déplacement manuel de l'utilisateur.
function Recadrage({ centre, actif }: { centre: Coordonnees; actif: boolean }) {
  const carte = useMap()
  const dejaCentre = useRef(false)
  useEffect(() => {
    if (!actif || dejaCentre.current) return
    dejaCentre.current = true
    carte.setView([centre.lat, centre.lng], carte.getZoom())
  }, [actif, centre.lat, centre.lng, carte])
  return null
}

export function CarteScreen({ pointChoisiId, onChoisir }: Props) {
  const { t } = useLangue()
  const geoloc = useGeolocate()
  const { pointFavori } = usePrefs()
  const [recherche, setRecherche] = useState('')

  const geolocOk = geoloc.statut === 'ok'
  const centreCarte: Coordonnees = geoloc.statut === 'ok' ? geoloc.pos : toulouseCentre

  // Clés primitives stables pour la mémoïsation.
  const lat = centreCarte.lat
  const lng = centreCarte.lng

  // Les distances ne sont affichées et le tri ne s'applique qu'avec une vraie position.
  const avecDistance = useMemo(() => {
    const origine: Coordonnees = { lat, lng }
    const liste = points.map((p) => ({ ...p, km: haversineKm(origine, p) }))
    return geolocOk ? liste.sort((a, b) => a.km - b.km) : liste
  }, [lat, lng, geolocOk])

  const favori = pointFavori ? avecDistance.find((p) => p.id === pointFavori) ?? null : null
  const horsZone = geolocOk && favori !== null && favori.km > 50

  const q = recherche.trim().toLowerCase()
  const filtres = q
    ? avecDistance.filter((p) => p.nom.toLowerCase().includes(q) || p.adresse.toLowerCase().includes(q))
    : avecDistance

  const distanceLabel = (km: number) =>
    km < 1 ? t('carte.distanceProche') : t('carte.distance', { km: km.toFixed(1).replace('.', ',') })

  return (
    <section>
      <h1>{t('carte.titre')}</h1>
      <p className="reseau-repris">
        <LogoRelaisColis hauteur={56} /> <span className="muted">{t('carte.reseau')}</span>
      </p>

      <label className="champ">
        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          aria-label={t('carte.recherche')}
          placeholder={t('carte.recherche')}
        />
      </label>

      {horsZone && !q && <p className="alerte">{t('carte.defautFavori')}</p>}

      <MapContainer center={[centreCarte.lat, centreCarte.lng]} zoom={13} className="carte" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recadrage centre={centreCarte} actif={geolocOk} />
        {filtres.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={p.id === pointChoisiId ? 12 : 8}
            pathOptions={{ color: couleurs[p.type], fillColor: couleurs[p.type], fillOpacity: 0.9 }}
          >
            <Popup>
              <strong>{p.nom}</strong>
              {geolocOk && (
                <>
                  <br />
                  {distanceLabel(p.km)}
                </>
              )}
            </Popup>
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

      {!geolocOk && <p className="muted">{t('carte.pasDeGeoloc')}</p>}

      {filtres.length === 0 && <p className="erreur">{t('carte.aucunResultat')}</p>}

      <ul className="liste-points">
        {filtres.map((p) => (
          <li key={p.id} className={p.id === pointChoisiId ? 'choisi' : ''}>
            <div>
              <strong>
                {p.nom}{' '}
                {p.id === pointFavori && <span className="badge">{t('carte.favori')}</span>}
              </strong>
              <div className="muted">
                {geolocOk && <>{distanceLabel(p.km)} · </>}
                {p.adresse} · {p.horaires} · {t('carte.capacite')} {t(`cap.${p.capacite}`)}
              </div>
            </div>
            <button
              className="etoile"
              aria-pressed={p.id === pointFavori}
              aria-label={t('profil.point')}
              onClick={() => setPointFavori(p.id === pointFavori ? null : p.id)}
            >
              ★
            </button>
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
