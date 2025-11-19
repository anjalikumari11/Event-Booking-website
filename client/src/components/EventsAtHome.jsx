import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { allEvents } from "../service/service";
import { useNavigate } from "react-router-dom";

function EventsAtHome() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await allEvents();
        setEvents(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    // dots: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="my-5">
      <h2 className="fw-bold text-center mb-4">🔥 Trending Events</h2>

      <div className="container px-4">
        <Slider {...settings}>
          {events.map((event) => (
            <div key={event.id} className="p-3">
              <div
                className="shadow border-0 bg-white"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={event.image}
                    alt="event"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />

                   <span
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      background: "#ff4757",
                      color: "white",
                      fontWeight: "bold",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    ₹{event.price}
                  </span>
                </div>

                <div className="p-3">
                  <h5 className="fw-bold text-truncate">{event.title}</h5>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    {event.description?.length > 55
                      ? event.description.substring(0, 55) + "..."
                      : event.description}
                  </p>

                  <button
                    className="btn btn-primary w-100 mt-2"
                    style={{ borderRadius: "30px" }}
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default EventsAtHome;
