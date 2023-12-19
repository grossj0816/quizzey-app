import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENTID}
    useRefreshTokens={true}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.href,
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: process.env.REACT_APP_AUTH_SCOPE
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </Auth0Provider>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
