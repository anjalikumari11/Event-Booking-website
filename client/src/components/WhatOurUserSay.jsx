import React from "react";
import banner from "/Banner.png";

function WhatOurUserSay() {
  return (
    <div
      className="shadow-0 p-3 mt-4"
      style={{ background: "#f4f3f3", borderRadius: "10px" }}
    >
      <h5 className="mb-3 fw-bold text-center">What our Users Say</h5>

      <div
        id="userCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          {/* First Slide */}
          <div className="carousel-item active">
            <div
              className="card shadow-sm border-0 text-center p-4 mx-auto"
              style={{ borderRadius: "20px", maxWidth: "400px" }}
            >
              <img
                src={banner}
                alt="User"
                className="rounded-circle border mb-3 mx-auto"
                style={{ height: "80px", width: "80px", objectFit: "cover" }}
              />
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">
                "This platform helped me improve my skills!"
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <div
              className="card shadow-sm border-0 text-center p-4 mx-auto"
              style={{ borderRadius: "20px", maxWidth: "400px" }}
            >
              <img
                src={banner}
                alt="User"
                className="rounded-circle border mb-3 mx-auto"
                style={{ height: "80px", width: "80px", objectFit: "cover" }}
              />
              <h5 className="card-title">Jane Smith</h5>
              <p className="card-text">
                "Great experience, I loved the learning process."
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#userCarousel"
          data-bs-slide="prev"
          style={{color:"black"}}
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#userCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default WhatOurUserSay;
