import LandingPage from './components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import MyCourse from './components/CoursePage/CoursePage';
import QuizzeySet from './components/QuizzySetPage/QuizzeySetPage';


const App = () => {
  
  const { isAuthenticated } = useAuth0();
  const origin = window.location.origin;


  return (
    <BrowserRouter>
      <Routes>
        <Route path={origin === "http://localhost:3000" ? '/' : '/index.html'} element={!isAuthenticated ? <LandingPage /> : <Dashboard origin={origin}/>} />
        {/* <Route path={origin === "http://localhost:3000" ? '/courses/:id' : '/index.html/courses/:id'} element={<MyCourse />} /> */}
        <Route path='/courses/:id' element={<MyCourse />} />
        {/* <Route path={origin === "http://localhost:3000" ? '/quizzey-set/:id' : '/index.html/quizzey-set/:id'} element={<QuizzeySet />} /> */}
        <Route path='/quizzey-set/:id' element={<QuizzeySet />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
