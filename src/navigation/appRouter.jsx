// src/navigation/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogedNav from '../components/logedNav';
import Home from '../pages/home/home';
import Universities from '../pages/universities/universities';
import Careers from '../pages/careers/careers';


const AppRouter = () => {
  return (
    <Router>
      <LogedNav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/careers" element={<Careers />} />
        </Routes>
    </Router>
  );
};

export default AppRouter;
