import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlanningProvider } from './context/PlanningContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlanningProvider>
      <App />
    </PlanningProvider>
  </StrictMode>,
)
