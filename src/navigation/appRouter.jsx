// src/navigation/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/home/home';
import Universities from '../pages/universities/universities';
import UniversityProfile from '../pages/universityProfile/UniversityProfile.jsx';
import CareersCategories from '../pages/careersCategories/careersCategories';
import MainLayout from '../layouts/mainLayout';
import AboutUs from '../pages/aboutUs/aboutUs';
import Test from '../pages/test/Test';
import ChatBot from '../pages/chatBot/ChatBot.jsx';
import UserProfile from '../pages/userProfile/userProfile.jsx';
import SearchResults from '../pages/SearchResults/SearchResults';
import CareerDetail from '../pages/careerDetail/CareerDetail.jsx';

import Profile from '../pages/Profille/Profile.jsx';
import AddSection from '../pages/AddSection/AddSection.jsx';

import Login from '../pages/login/Login.jsx';
import Landing from '../pages/landing/Landing';
import Register from '../pages/register/Register.jsx';

const AppRouter = () => {
  return (
  <Router>
        <Routes>
          {/* Rutas que usan NAV */}
          <Route element={<MainLayout/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/universities/:slug" element={<UniversityProfile />} />
            <Route path="/careers" element={<CareersCategories />} />
            <Route path="/careers/:slug" element={<CareersCategories />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/test" element={<Test />} />
            <Route path="/uni-ai" element={<ChatBot />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/search" element={<SearchResults />} />

            <Route path="/:id/profile" element={<Profile />} />
            <Route path="/:universityId/profile/careers/:careerId" element={<CareerDetail />} />
            <Route path="/add-section" element={<AddSection />} />
          </Route>

          <Route path="/" element={<Landing />} />          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Rutas sin NAV */}

          
        </Routes>
      </Router>
  );
};


/*

{
    "tipo": "estudiante",
    "nombreusuario": "cirobendov",
    "mail": "cirobd@gmail.com",
    "contraseña": "ciro23",
    "fecharegistro": "2024-05-20T12:00:00Z",
    "activo": true,
    "emailverificado": false
}


*/


export default AppRouter;
