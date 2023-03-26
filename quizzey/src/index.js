import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Auth0Provider
    domain="dev-ha6q1jxc.us.auth0.com"
    clientId="4Ukqacu6IEFKEgv5R5xMbct8HoFA3p2Z"
    useRefreshTokens={true}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.href,
      audience: "https://dev-ha6q1jxc.us.auth0.com/api/v2/",
      scope: "read:current_user update:current_user_metadata"
    }}
  >
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Auth0Provider>
);




console.log()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
