import { useState } from 'react'
import { colisDemo } from './data/colis'
import { points } from './data/points'
import { Logo } from './components/Logo'
import { Icone, type NomIcone } from './components/Icone'
import { languesDisponibles, useLangue, type Langue } from './i18n'
import { SuiviScreen } from './screens/SuiviScreen'
import { CarteScreen } from './screens/CarteScreen'
import { RetraitScreen } from './screens/RetraitScreen'
import { EnvoiScreen } from './screens/EnvoiScreen'
import { ParrainageScreen } from './screens/ParrainageScreen'
import { ProfilScreen } from './screens/ProfilScreen'
import { AideScreen } from './screens/AideScreen'
import { ImpactScreen } from './screens/ImpactScreen'

type Ecran = 'suivi' | 'carte' | 'retrait' | 'envoyer' | 'parrainage' | 'profil' | 'aide' | 'impact'

// Les écrans Aide et Impact sont rattachés à l'onglet Profil.
const ecransDuProfil: Ecran[] = ['profil', 'aide', 'impact']

const onglets: { id: Ecran; cle: string; icone: NomIcone }[] = [
  { id: 'suivi', cle: 'nav.suivi', icone: 'suivi' },
  { id: 'carte', cle: 'nav.carte', icone: 'carte' },
  { id: 'retrait', cle: 'nav.retrait', icone: 'retrait' },
  { id: 'envoyer', cle: 'nav.envoyer', icone: 'envoyer' },
  { id: 'parrainage', cle: 'nav.parrainage', icone: 'parrainage' },
  { id: 'profil', cle: 'nav.profil', icone: 'profil' },
]

export default function App() {
  const { langue, setLangue, t } = useLangue()
  const [ecran, setEcran] = useState<Ecran>('suivi')
  const [numero, setNumero] = useState(colisDemo[0].numero)
  const [pointId, setPointId] = useState<string | null>(null)

  const colis = colisDemo.find((c) => c.numero === numero) ?? colisDemo[0]
  const pointChoisi = points.find((p) => p.id === (pointId ?? colis.pointId)) ?? null

  return (
    <div className="app">
      <header className="entete">
        <div className="marque">
          <Logo />
          <span>Relais</span>
        </div>
        <select
          className="langue"
          aria-label={t('entete.langue')}
          value={langue}
          onChange={(e) => setLangue(e.target.value as Langue)}
        >
          {languesDisponibles.map((l) => (
            <option key={l.code} value={l.code} disabled={!l.actif}>{l.libelle}</option>
          ))}
        </select>
      </header>

      <p className="bandeau-fictif">{t('bandeau')}</p>

      <main className="contenu">
        {ecran === 'suivi' && (
          <SuiviScreen
            numero={numero}
            onChangerNumero={setNumero}
            colis={colis}
            onVoirCarte={() => setEcran('carte')}
          />
        )}
        {ecran === 'carte' && (
          <CarteScreen
            pointChoisiId={pointChoisi?.id ?? null}
            onChoisir={(id) => {
              setPointId(id)
              setEcran('retrait')
            }}
          />
        )}
        {ecran === 'retrait' && <RetraitScreen colis={colis} point={pointChoisi} />}
        {ecran === 'envoyer' && <EnvoiScreen />}
        {ecran === 'parrainage' && <ParrainageScreen />}
        {ecran === 'profil' && (
          <ProfilScreen onVoirAide={() => setEcran('aide')} onVoirImpact={() => setEcran('impact')} />
        )}
        {ecran === 'aide' && <AideScreen />}
        {ecran === 'impact' && <ImpactScreen />}
      </main>

      <nav className="onglets" aria-label="Navigation">
        {onglets.map((o) => (
          <button
            key={o.id}
            className={
              ecran === o.id || (o.id === 'profil' && ecransDuProfil.includes(ecran)) ? 'onglet actif' : 'onglet'
            }
            onClick={() => setEcran(o.id)}
          >
            <Icone nom={o.icone} />
            <span>{t(o.cle)}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
