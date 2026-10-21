import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import './screens.css'
import App from './App.tsx'
import { LangueProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangueProvider>
      <App />
    </LangueProvider>
  </StrictMode>,
)
