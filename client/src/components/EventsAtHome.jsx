import React from 'react'
import banner from "/Banner.png";

function EventsAtHome() {
  return (
    <div className='p-3'>
      <h5 className='mb-3 fw-bold'>Featured Events</h5>
      
      <div className="row g-4">

        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "20px" }}>
            <img src={banner} className="card-img-top" height={170} alt="..." style={{ borderRadius: "20px" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Card title</h5>
              <p className="card-text flex-grow-1">Some quick example text to build on the card title.</p>
              <a href="#" className="btn btn-primary" style={{ borderRadius: "50px",maxWidth:"120px"}}>View Details</a>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "20px" }}>
            <img src={banner} className="card-img-top" height={170} alt="..." style={{ borderRadius: "20px" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Card title</h5>
              <p className="card-text flex-grow-1">Some quick example text to build on the card title.</p>
              <a href="#" className="btn btn-primary" style={{ borderRadius: "50px",maxWidth:"120px"}}>View Details</a>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "20px" }}>
            <img src={banner} className="card-img-top" height={170} alt="..." style={{ borderRadius: "20px" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Card title</h5>
              <p className="card-text flex-grow-1">Some quick example text to build on the card title.</p>
              <a href="#" className="btn btn-primary" style={{ borderRadius: "50px",maxWidth:"120px"}}>View Details</a>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "20px" }}>
            <img src={banner} className="card-img-top" height={170} alt="..." style={{ borderRadius: "20px" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Card title</h5>
              <p className="card-text flex-grow-1">Some quick example text to build on the card title.</p>
              <a href="#" className="btn btn-primary" style={{ borderRadius: "50px",maxWidth:"120px"}}>View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsAtHome
