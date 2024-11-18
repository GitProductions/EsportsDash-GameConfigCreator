import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GameConfigExplorer from './components/configDownloader.jsx'
import ConfigBuilder  from './components/configCreator'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
   
  </StrictMode>
)
