// Calcul de distance à vol d'oiseau (haversine) et position de l'utilisateur pour la démo.
import { useEffect, useState } from 'react'

export interface Coordonnees {
  lat: number
  lng: number
}

// Toulouse centre : position de repli si la géolocalisation est refusée ou indisponible.
export const toulouseCentre: Coordonnees = { lat: 43.6045, lng: 1.4442 }

export function haversineKm(a: Coordonnees, b: Coordonnees): number {
  const rayonTerre = 6371
  const rad = (degres: number) => (degres * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * rayonTerre * Math.asin(Math.sqrt(x))
}

export type EtatGeoloc =
  | { statut: 'idle' }
  | { statut: 'refusee' }
  | { statut: 'ok'; pos: Coordonnees }

export function useGeolocate(): EtatGeoloc {
  const [etat, setEtat] = useState<EtatGeoloc>({ statut: 'idle' })

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setEtat({ statut: 'refusee' })
      return
    }
    const id = navigator.geolocation.watchPosition(
      (p) => setEtat({ statut: 'ok', pos: { lat: p.coords.latitude, lng: p.coords.longitude } }),
      () => setEtat({ statut: 'refusee' }),
      { enableHighAccuracy: false, maximumAge: 600_000 },
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return etat
}
