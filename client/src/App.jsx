import React from 'react'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import EventsAtHome from './components/EventsAtHome';
import WhatOurUserSay from './components/WhatOurUserSay';
import ReadyToYourWebsite from './components/ReadyToYourWebsite';
import Working from './components/Working';
import ContactUs from './components/ContactUs';
import Map from './components/Map';
import Footer from './components/Footer';

function App() {
  return (
    <div className='body'>
      <Navbar />
      <Banner />

      <div className='container-fluid row mx-auto p-2'
        style={{ width: "95vw", borderRadius: "10px" }}>
        <div className='col-3'>
          <Sidebar />
          <WhatOurUserSay />
        </div>
        <div className='col-9'>
          <EventsAtHome />
          <ReadyToYourWebsite />
        </div>

      </div>
      <div className='container-fluid px-5 py-2'>
        <Working />
      </div>
      <div className='container-fluid row mx-auto p-2'
        style={{ width: "95vw", borderRadius: "10px" }}>
        <div className='col-8'>
          <ContactUs />
        </div>
        <div className='col-4'>
        <Map />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default App
