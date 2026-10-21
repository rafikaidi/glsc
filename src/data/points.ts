// Données FICTIVES : points relais et consignes de démonstration à Toulouse.
export type TypePoint = 'GLS' | 'Consigne' | 'Ex-Relais Colis'

export interface PointRelais {
  id: string
  nom: string
  type: TypePoint
  adresse: string
  lat: number
  lng: number
  horaires: string
  capacite: 'disponible' | 'limitée' | 'pleine'
}

export const points: PointRelais[] = [
  { id: 'p1', nom: 'Point GLS Capitole', type: 'GLS', adresse: '1 place du Capitole', lat: 43.6045, lng: 1.4442, horaires: '9h-19h', capacite: 'disponible' },
  { id: 'p2', nom: 'Consigne Matabiau', type: 'Consigne', adresse: 'Gare Matabiau, hall', lat: 43.6112, lng: 1.4537, horaires: '24h/24', capacite: 'disponible' },
  { id: 'p3', nom: 'Relais Carmes', type: 'Ex-Relais Colis', adresse: '12 rue des Filatiers', lat: 43.5996, lng: 1.4439, horaires: '8h30-20h', capacite: 'limitée' },
  { id: 'p4', nom: 'Point GLS Saint-Cyprien', type: 'GLS', adresse: '40 quai de la Daurade', lat: 43.5995, lng: 1.4176, horaires: '9h-19h30', capacite: 'disponible' },
  { id: 'p5', nom: 'Relais Compans-Caffarelli', type: 'Ex-Relais Colis', adresse: '5 allées Jean-Jaurès', lat: 43.6083, lng: 1.4453, horaires: '8h-19h', capacite: 'pleine' },
  { id: 'p6', nom: 'Consigne Basso Cambo', type: 'Consigne', adresse: 'Centre commercial Basso Cambo', lat: 43.5825, lng: 1.3920, horaires: '7h-22h', capacite: 'disponible' },
  { id: 'p7', nom: 'Point GLS Minimes', type: 'GLS', adresse: '18 avenue de Lombez', lat: 43.5948, lng: 1.4600, horaires: '9h-18h', capacite: 'disponible' },
  { id: 'p8', nom: 'Relais Blagnac', type: 'Ex-Relais Colis', adresse: '3 avenue de l\'Europe', lat: 43.6360, lng: 1.3905, horaires: '9h-19h', capacite: 'limitée' },
]
