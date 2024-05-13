import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="945847832009-39112hp9ne0uf3mvq4v1iuhg2ihur06n.apps.googleusercontent.com">
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
