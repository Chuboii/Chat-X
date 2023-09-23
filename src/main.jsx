import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import {AlertProvider} from "/src/context/AlertContext.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <UserProvider>
  <AlertProvider>
    <App />
    </AlertProvider> 
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
