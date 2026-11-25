
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/normalize.css'
import './styles/base.css'
import './styles/style.css'

import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>,
)