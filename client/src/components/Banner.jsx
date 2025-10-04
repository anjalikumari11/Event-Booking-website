import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getAllImageFromDB } from "../service/service";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "./Navbar";

function Banner() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getAllImageFromDB();
        setImages(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="positon-relative ">
      <Navbar/>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        style={{ width: "100%", height: "100vh" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "center",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "20px" }}>
                  Discover & Book <br /> Simple Experiences
                </h1>
                <button
                  onClick={() => navigate("exploreEvents")}
                  style={{
                    padding: "12px 30px",
                    background: "orange",
                    border: "none",
                    borderRadius: "30px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#ff9c00")}
                  onMouseLeave={e => (e.currentTarget.style.background = "orange")}
                >
                  Explore Events
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
