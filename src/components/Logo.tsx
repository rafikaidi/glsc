// Logos fournis pour la démo, découpés depuis le visuel GLS / Relais Colis.
const base = import.meta.env.BASE_URL

export function Logo({ hauteur = 32 }: { hauteur?: number }) {
  return <img src={`${base}logos/gls.png`} alt="GLS" height={hauteur} className="logo-gls" />
}

export function LogoRelaisColis({ hauteur = 40 }: { hauteur?: number }) {
  return <img src={`${base}logos/relais-colis.png`} alt="Relais Colis" height={hauteur} className="logo-relais" />
}
