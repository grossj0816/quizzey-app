import LandingPage from './components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  
  const { isAuthenticated } = useAuth0();


  if (!isAuthenticated) 
  {
    return <div><LandingPage /></div>;  
  }
  return <div><LandingPage /></div>;

}

export default App;
