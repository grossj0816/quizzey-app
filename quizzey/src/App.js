import LandingPage from './components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import MyCourse from './components/CoursePage/CoursePage';
import QuizzeySet from './components/QuizzySetPage/QuizzeySetPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInformation } from './redux/actions/userInfoActions';



const App = () => {
  
  const {user, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();
  const origin = window.location.origin;
  const dispatch = useDispatch();
  
  useEffect(() => {
    localStorage.setItem('recent_opened_sets', []);
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://dev-ha6q1jxc.us.auth0.com/api/v2/",
            scope: "read:current_user",
          }
        });
        dispatch(getUserInformation(token));
      } 
      catch (e) 
      {
        console.log(e.message);
      }
       
    }
    getAccessToken();

  }, [getAccessTokenSilently, user?.sub])

  

  return (
      <Routes>
        <Route path={origin === "http://localhost:3000" ? '/' : '/index.html'} element={!isAuthenticated ? <LandingPage /> : <Dashboard />} />
        <Route path='/courses/:id' element={<MyCourse />} />
        <Route path='/quizzey-set/:id' element={<QuizzeySet />} />
      </Routes>
  );

}

export default App;
