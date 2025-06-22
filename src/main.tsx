import '@picocss/pico/css/pico.min.css';
import '@picocss/pico/css/pico.colors.min.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
