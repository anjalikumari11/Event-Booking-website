import React, { useState } from "react";
import { createEvent } from "../service/service";

function CreateEvent() {
  const [bgImage, setBgImage] = useState(null);

  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    event_date: "",
    Booking_end_date: "",
    location_name: "",
    category: "",
    normal_price: "",
    vip_price: "",
    seats: ""
  });

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser.id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImage(imageUrl);
    }
  };

  const handleSubmitData = async () => {
    if (!eventDetails.title || !eventDetails.description || !eventDetails.event_date || !eventDetails.Booking_end_date || !eventDetails.location_name || !eventDetails.normal_price || !eventDetails.vip_price || !eventDetails.seats || !bgImage) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", eventDetails.title);
    formData.append("description", eventDetails.description);
    formData.append("start_date", eventDetails.event_date);
    formData.append("end_date", eventDetails.Booking_end_date);
    formData.append("organizer_id", userId);
    formData.append("location", eventDetails.location_name);
    formData.append("price", eventDetails.normal_price);
    formData.append("event_date", eventDetails.event_date);
    formData.append("VIP_price", eventDetails.vip_price);
    formData.append("seats", eventDetails.seats);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      const res = await createEvent(formData);
      const data = await res.json();
      resetForm();
      if (res.ok) {
        alert(" Event created successfully!");
      } else {
        alert(` Error: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error submitting event:", err);
      alert(" Something went wrong while creating the event.");
    }
  };

  const resetForm = () => {
    setEventDetails({
      title: "",
      description: "",
      event_date: "",
      Booking_end_date: "",
      location_name: "",
      category: "",
      normal_price: "",
      vip_price: "",
      seats: ""
    });
    setBgImage(null);
  }

  return (
    <div
      className="px-3 px-md-5 py-4"
      style={{ background: "#f4f6f9", minHeight: "100vh" }}
    >
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#333" }}>
          Create Your Event
        </h1>
        <p className="text-muted">
          Fill out the details below to list your amazing event
        </p>
      </div>

      <div className="row g-4">
        <div
          className="col-md-6 col-12 p-4 shadow-sm rounded-4 bg-white"
          style={{ borderLeft: "5px solid #ff9900" }}
        >
          <h5 className="fw-bold mb-4" style={{ color: "#ff6600" }}>
            Event Details
          </h5>

          <div className="form-floating mb-3">
            <input
              type="text"
              id="eventTitle"
              className="form-control rounded-3"
              placeholder="Event Title"
              required
              value={eventDetails.title}
              onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}

            />
            <label htmlFor="eventTitle">Event Title</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              id="eventDate"
              className="form-control rounded-3"
              required
              value={eventDetails.event_date}
              onChange={(e) => setEventDetails({ ...eventDetails, event_date: e.target.value })}

            />
            <label htmlFor="eventDate">Event Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="date"
              id="bookingDate"
              className="form-control rounded-3"
              required
              value={eventDetails.Booking_end_date}
              onChange={(e) => setEventDetails({ ...eventDetails, Booking_end_date: e.target.value })}

            />
            <label htmlFor="eventDate">Booking Till</label>
          </div>

          <div className="form-floating mb-3">
            <select className="form-select rounded-3" id="category" required
              value={eventDetails.category}
              onChange={(e) => setEventDetails({ ...eventDetails, category: e.target.value })}
            >
              <option value="">--- Select ---</option>
              <option value={"music"}>Music</option>
              <option value={"dance"}>Dance</option>
              <option value={"artCraft"}>Art & Craft</option>
            </select>
            <label htmlFor="category">Category</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              id="desc"
              className="form-control rounded-3"
              placeholder="Write more about your event"
              style={{ height: "120px" }}
              required
              value={eventDetails.description}
              onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}


            ></textarea>
            <label htmlFor="desc">Description</label>
          </div>
        </div>

        <div className="col-md-6 col-12 p-4 shadow-sm rounded-4 bg-white">
          <h5 className="fw-bold mb-2" style={{ color: "#ff6600" }}>
            Event Media
          </h5>
          <p className="text-muted">
            Upload images or videos related to your event here.
          </p>

          <div
            className="border border-2 border-dashed rounded-4 p-4 text-center"
            style={{
              minHeight: "280px",
              backgroundImage: bgImage ? `url(${bgImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#888",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {bgImage ? "" : "📂 Drag & Drop files or click to upload"}
          </div>

          <input
            type="file"
            className="form-control mt-3"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="col-md-6 col-12 p-4 shadow-sm rounded-4 bg-white">
          <h5 className="fw-bold mb-4" style={{ color: "#ff6600" }}>
            Location
          </h5>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              id="address"
              placeholder="Location Address"
              required
              value={eventDetails.location_name}
              onChange={(e) => setEventDetails({ ...eventDetails, location_name: e.target.value })}
            />
            <label htmlFor="address">Location full Address</label>
          </div>
        </div>

        <div className="col-md-6 col-12 p-4 shadow-sm rounded-4 bg-white">
          <h5 className="fw-bold mb-4" style={{ color: "#ff6600" }}>
            Ticketing & Pricing
          </h5>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control rounded-3"
              id="vip"
              placeholder="VIP Ticket"
              required
              value={eventDetails.vip_price}
              onChange={(e) => setEventDetails({ ...eventDetails, vip_price: e.target.value })}

            />
            <label htmlFor="vip">💎 VIP Ticket Price</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control rounded-3"
              id="normal"
              placeholder="Normal Ticket"
              required
              value={eventDetails.normal_price}
              onChange={(e) => setEventDetails({ ...eventDetails, normal_price: e.target.value })}
            />
            <label htmlFor="normal">🎫 Normal Ticket Price</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control rounded-3"
              id="seats"
              placeholder="Total Seats"
              required
              value={eventDetails.seats}
              onChange={(e) => setEventDetails({ ...eventDetails, seats: e.target.value })}
            />
            <label htmlFor="seats">Total Seats</label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center my-4">
        <button
          className="btn btn-lg fw-semibold text-white rounded-pill px-5 py-2 shadow-sm"
          style={{ background: "#ff9900" }}
          onClick={handleSubmitData}
        >
          PUBLISH EVENT
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
