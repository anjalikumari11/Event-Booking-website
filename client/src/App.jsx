import React, { useEffect } from 'react';
import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DetailEvent from './pages/DetailEvent';
import CreateEvent from './pages/CreateEvent';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashboardLayout from './Dashboard/DashboardLayout';
import UserAnalytics from './Dashboard/UserAnalytics';
import DashboardPayments from './Dashboard/DashboardPayments';
import Profile from './Dashboard/Profile';
import About from './components/About';
import ProtectedRoute from './ProtectedRoute';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploreEvents" element={<ExploreEvents />} />
        <Route path='/events/:id' element={<DetailEvent/>} />
        <Route path='/createEvent' element={<CreateEvent/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserAnalytics />} />        
          <Route path="profile" element={<Profile />} />  
          <Route path="payments" element={<DashboardPayments/>} />  
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
