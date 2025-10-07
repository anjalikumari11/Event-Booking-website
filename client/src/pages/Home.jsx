// import React from 'react'
import Banner from '../components/Banner';
import EventsAtHome from '../components/EventsAtHome';
import WhatOurUserSay from '../components/WhatOurUserSay';
import ReadyToYourWebsite from '../components/ReadyToYourWebsite';
import Working from '../components/Working';
import ContactUs from '../components/ContactUs';
import Map from '../components/Map';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='body'>
      <Banner />
      <div className='container-fluid row mx-auto p-2'
        style={{ width: "95vw", borderRadius: "10px" }}>
        
        <div className='col-12'>
          <EventsAtHome />
        </div>
        <div className='col-3'>
          <WhatOurUserSay/>
        </div>
        <div className='col-9'>
          <ReadyToYourWebsite/>
        </div>

      </div>
      <div className='container-fluid px-5 py-2'>
        <Working />
      </div>
      {/* <div className='container-fluid row mx-auto p-2'
        style={{ width: "95vw", borderRadius: "10px" }}>
        <div className='col-8'>
          <ContactUs />
        </div>
        <div className='col-4'>
          <Map />
        </div>
      </div> */}
      <Footer />
    </div>
  )
}

export default Home
