import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GameConfigExplorer from './pages/configDownloader.jsx'
import ConfigBuilder from './pages/configCreator.jsx'
import { ThemeProvider } from './context/ThemeContext';

// import CSVSorter from './components/CSV/csvloader'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)


    {/* <CSVSorter /> */}