import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faTicket, faClipboardList, faMoneyBillWave, faDownload, faMapMarkerAlt, faCog } from "@fortawesome/free-solid-svg-icons";

function Working() {

const steps = [
  {
    step: 1,
    title: "Sign Up / Log In",
    description: "Create a new account using your email/phone or log in if you already have an account.",
    icon: faUser
  },
  {
    step: 2,
    title: "Browse Events",
    description: "Explore upcoming events. Use filters to find the event you want.",
    icon: faSearch
  },
  {
    step: 3,
    title: "Select Your Tickets",
    description: "Choose the number and type of tickets you want and click 'Book Now'.",
    icon: faTicket
  },
  {
    step: 4,
    title: "Provide Booking Details",
    description: "Enter your personal details, review your selection, and confirm the total cost.",
    icon: faClipboardList
  },
  {
    step: 5,
    title: "Make Payment",
    description: "Select a payment method and complete the payment process.",
    icon: faMoneyBillWave
  },
  {
    step: 6,
    title: "Receive Tickets",
    description: "Download your e-ticket or QR code, or check your email for confirmation.",
    icon: faDownload
  },
  {
    step: 7,
    title: "Attend the Event",
    description: "Show your e-ticket or QR code at the venue and enjoy the event.",
    icon: faMapMarkerAlt
  },
  {
    step: 8,
    title: "Manage Your Bookings",
    description: "View your bookings, and download tickets again.",
    icon: faCog
  }
];


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
        {steps.map((i) => (
          <SwiperSlide key={i}>
            <div
              className="card shadow-sm border-0 text-center p-4 mx-auto mb-3 swiper-card"
              style={{ maxWidth: "400px" , minHeight:"300px"}}
            >
              <div
                className="rounded-circle mb-3 mx-auto d-flex justify-content-center align-items-center"
                style={{ height: "80px", width: "80px", background: "#f4f3f3" }}
              >
                <FontAwesomeIcon icon={i.icon} size={"2x"} color="orange" />
              </div>
              <p className="card-text fw-bold" style={{color:"#868282ff"}}>{i.title}</p>
              <p className="card-text">
                {i.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Working;
