import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

function Working() {
  return (
    <div
      className="shadow-0 p-3 text-left"
      style={{ background: "#f4f3f3", borderRadius: "10px" }}
    >
      <h3 className="text-center my-2">How It Works</h3>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={4} 
        loop={true}
        allowTouchMove={false}   
        speed={5000}             
        autoplay={{
          delay: 0,              
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SwiperSlide key={i}>
            <div
              className="card shadow-sm border-0 text-center p-4 mx-auto mb-3 swiper-card"
              style={{ maxWidth: "400px" }}
            >
              <div
                className="rounded-circle mb-3 mx-auto d-flex justify-content-center align-items-center"
                style={{ height: "80px", width: "80px", background: "#f4f3f3" }}
              >
                <FontAwesomeIcon icon={faCalendar} size={"2x"} color="orange" />
              </div>
              <p className="card-text">
                "Great experience, I loved the learning process."
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Working;
