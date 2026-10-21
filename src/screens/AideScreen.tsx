import { useState, type FormEvent } from 'react'
import { useLangue } from '../i18n'

const questions = [1, 2, 3, 4] as const

export function AideScreen() {
  const { t } = useLangue()
  const [envoye, setEnvoye] = useState(false)

  const envoyer = (e: FormEvent) => {
    e.preventDefault()
    setEnvoye(true)
  }

  return (
    <section>
      <h1>{t('aide.titre')}</h1>

      <h2>{t('aide.faq')}</h2>
      {questions.map((n) => (
        <details key={n} className="faq">
          <summary>{t(`faq.q${n}`)}</summary>
          <p>{t(`faq.a${n}`)}</p>
        </details>
      ))}

      <h2>{t('aide.contact')}</h2>
      <p className="muted">{t('aide.tel')}</p>

      {envoye ? (
        <p className="alerte">{t('aide.ok')}</p>
      ) : (
        <form onSubmit={envoyer} className="carte-bloc">
          <label className="champ">
            {t('aide.sujet')}
            <select defaultValue="colis">
              <option value="colis">{t('aide.sujets.colis')}</option>
              <option value="point">{t('aide.sujets.point')}</option>
              <option value="autre">{t('aide.sujets.autre')}</option>
            </select>
          </label>
          <label className="champ">
            {t('aide.message')}
            <textarea rows={4} required />
          </label>
          <button type="submit" className="principal">{t('aide.envoyer')}</button>
        </form>
      )}
    </section>
  )
}
