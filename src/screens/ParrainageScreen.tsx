import { useState } from 'react'
import { useLangue } from '../i18n'

// Code et compteurs FICTIFS pour la démonstration.
const codeParrain = 'LEA-TLS-2026'
const stats = { invites: 3, inscrits: 2 }

export function ParrainageScreen() {
  const { t } = useLangue()
  const [copie, setCopie] = useState(false)

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(codeParrain)
      setCopie(true)
    } catch {
      // Presse-papiers indisponible : le code reste affiché à l'écran.
    }
  }

  const partager = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'GLS Relais (démo)', text: `${t('parr.texte')} ${codeParrain}` })
        return
      }
    } catch {
      // Partage annulé par l'utilisateur : rien à faire.
      return
    }
    await copier()
  }

  return (
    <section>
      <h1>{t('parr.titre')}</h1>
      <p>{t('parr.texte')}</p>

      <div className="carte-bloc code-parrain">
        <span className="muted">{t('parr.code')}</span>
        <strong className="code">{codeParrain}</strong>
        <div className="actions-ligne">
          <button onClick={copier}>{copie ? t('parr.copie') : t('parr.copier')}</button>
          <button className="secondaire" onClick={partager}>{t('parr.partager')}</button>
        </div>
      </div>

      <p className="muted">{t('parr.stats', stats)}</p>
      <p className="muted">{t('parr.conditions')}</p>
    </section>
  )
}
