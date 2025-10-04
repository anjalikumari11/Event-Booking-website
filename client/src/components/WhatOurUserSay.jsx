import React, { useEffect, useState } from "react";
import { getUsersWord } from "../service/service";

function WhatOurUserSay() {
  const [userWords, setUserWords] = useState([]);

  useEffect(() => {
    const fetchUsersSay = async () => {
      try {
        const res = await getUsersWord();
        setUserWords(res.data.data);
        // console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersSay();
  }, []);

  if (userWords.length === 0) return null; 

  return (
    <div className="shadow-0 p-3 mt-4" style={{ background: "#f4f3f3", borderRadius: "10px" }}>
      <h5 className="mb-3 fw-bold text-center">What our Users Say</h5>

      <div id="userCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {userWords.map((u, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="card shadow-sm border-0 text-center p-4 mx-auto" style={{ borderRadius: "20px", maxWidth: "400px" }}>
                <img
                  src={u.image}
                  alt="User"
                  className="rounded-circle border mb-3 mx-auto"
                  style={{ height: "80px", width: "80px", objectFit: "cover" }}
                />
                <h5 className="card-title">{u.name}</h5>
                <p className="card-text">"{u.description}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#userCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#userCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default WhatOurUserSay;
