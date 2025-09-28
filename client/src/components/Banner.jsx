import React from 'react'
import banner from "/Banner.png"

function Banner() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center my-3"
      style={{
        width: "95vw",
        height: "300px",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
      }}
    >
      <div style={{
        position: "absolute",
        left: 50,
        top: 190
      }} >
        <h1 className="text-white">Discover & Book <br />Simple Experience</h1>
        <div className='text-center py-2' style={{ background: "orange", maxWidth: "150px", borderRadius: 30 }}>
          <div className='text-white' ><strong>Explore Events</strong></div>
        </div>
      </div>

    </div>
  )
}

export default Banner
