import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('ORIGIN: ', window.location.origin)
root.render(
  <Auth0Provider
    domain='dev-ha6q1jxc.us.auth0.com'
    clientId='4Ukqacu6IEFKEgv5R5xMbct8HoFA3p2Z'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
