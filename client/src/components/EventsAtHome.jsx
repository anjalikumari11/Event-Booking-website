import React, { useState, useEffect } from 'react';
import { allEvents } from '../service/service';
import { useNavigate } from 'react-router-dom';

function EventsAtHome() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await allEvents();
        setEvents(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      }
    };
    fetchAllEvents();
  }, []);

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter(event => event.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="p-4 mb-5" style={{ minHeight: "400px", background: "#f9f9fb" }}>
      
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {["All", "Music", "Dance", "Art & Craft"].map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 fw-semibold btn ${
              selectedCategory === cat ? "btn-primary text-white" : "btn-outline-primary"
            }`}
            style={{ borderRadius: "30px", transition: "0.3s" }}
          >
            {cat}
          </button>
        ))}
      </div>

      <h3 className="fw-bold text-center mb-4" style={{ color: "#333" }}>
         Featured Events
      </h3>

      <div className="row g-4 justify-content-center">
        {filteredEvents.map((event, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div 
              className="card h-100 shadow-sm border-0"
              style={{ 
                borderRadius: "20px", 
                transition: "transform 0.3s, box-shadow 0.3s" 
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="card-img-top"
                height={170}
                style={{ borderRadius: "20px 20px 0 0", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-truncate">
                  {event.title || "Event Title"}
                </h5>
                <p className="card-text text-muted flex-grow-1" style={{ fontSize: "14px" }}>
                  {event.description || "Some quick example text to build on the card title."}
                </p>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  <button
                    className="btn btn-primary btn-sm px-3 fw-semibold"
                    style={{ borderRadius: "50px" }}
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    View Details
                  </button>
                  <span className='fw-bold text-danger fs-6'>₹{event.price || 100}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center text-muted mt-5">
            <h5>No events available in "{selectedCategory}" 🚫</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsAtHome;
