import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import {AlertProvider} from "/src/context/AlertContext.jsx"
import {ToggleProvider} from "/src/context/ToggleContext.jsx"
import {OnSnapshotProvider} from "/src/context/OnSnapshotData.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <ToggleProvider>
  <OnSnapshotProvider>
  <UserProvider>
  <AlertProvider>
    <App />
    </AlertProvider> 
    </UserProvider>
    </OnSnapshotProvider>
    </ToggleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
