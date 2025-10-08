import React from 'react';
import Banner from '../components/Banner';
import EventsAtHome from '../components/EventsAtHome';
import WhatOurUserSay from '../components/WhatOurUserSay';
import ReadyToYourWebsite from '../components/ReadyToYourWebsite';
import Working from '../components/Working';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='body'>
      
      <Banner />

      
      <div
        className='container-fluid row mx-auto p-2'
        style={{ width: "95vw", borderRadius: "10px" }}
      >
        
        <div className='col-12 mb-3'>
          <EventsAtHome />
        </div>

        
        <div className='col-12 col-md-4 mb-3'>
          <WhatOurUserSay />
        </div>
        <div className='col-12 col-md-8 mb-3'>
          <ReadyToYourWebsite />
        </div>
      </div>

      {/* Working Section */}
      <div className='container-fluid px-3 px-md-5 py-2'>
        <Working />
      </div>

      
      <Footer />
    </div>
  );
}

export default Home;
