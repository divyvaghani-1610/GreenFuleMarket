
import { StrictMode } from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  
  <Auth0Provider
    domain="dev-6mxmzpksfpcmn4fl.us.auth0.com"
    clientId="zZb9MySeqoq6dl98NYO1VtU9sjKiCWK7"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </Auth0Provider>
);