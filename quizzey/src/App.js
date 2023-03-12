import LandingPage from './components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';


const App = () => {
  
  const { isAuthenticated } = useAuth0();
  const origin = window.location.origin;


  return (
    <BrowserRouter>
      <Routes>
        <Route path={origin === "http://localhost:3000" ? '/' : '/index.html'} element={!isAuthenticated ? <LandingPage /> : <Dashboard />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
