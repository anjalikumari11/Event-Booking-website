import React, { useEffect, useState } from 'react';
import './DashboardWishlist.css';
import { getWishlistItem, removeItem } from '../service/service';

function DashboardWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const user_id = user.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWishlistItem(user_id);
      setWishlist(res.data.data || []);
    };
    if (user_id) fetchData();
  }, [user_id]);

   const handleRemoveItem = async (event_id) => {
    try {
      await removeItem({ user_id, event_id });
      fetchData(); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h3 className="mb-4 text-center fw-bold">My Wishlist</h3>
      <div className="row justify-content-center">
        {wishlist.length > 0 ? (
          wishlist.map((event) => (
            <div key={event.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card wishlist-card shadow-sm">
                <div className="wishlist-img-container">
                  <img
                    src={event.image || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={event.title}
                    className="card-img-top wishlist-img"
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">{event.title}</h5>

                  <p className="text-muted mb-1">
                    <i className="bi bi-calendar-event me-2"></i>
                    {event.start_date
                      ? new Date(event.start_date).toLocaleDateString()
                      : "N/A"}{" "}
                    to{" "}
                    {event.end_date
                      ? new Date(event.end_date).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p className="text-muted">
                    <i className="bi bi-geo-alt me-2"></i>
                    {event.location || "Location not available"}
                  </p>

                  <h6 className="fw-bold text-success mb-3">
                    {event.price
                      ? `₹${event.price}`
                      : "Free Entry"}
                  </h6>

                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveItem(event.id)}>
                    <i className="bi bi-heart-fill me-1"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No items in your wishlist yet.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardWishlist;
