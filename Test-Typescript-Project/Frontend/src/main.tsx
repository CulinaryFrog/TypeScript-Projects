import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render( //"!" is a non-null assertion operator, which tells TS that it isn't null
  <StrictMode>
    <App />
  </StrictMode>,
)
