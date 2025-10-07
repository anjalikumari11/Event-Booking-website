import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookSlot, getEventById } from '../service/service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';


export default function DetailEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passType, setPassType] = useState("Normal");
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    useEffect(() => {
        const fetchEvent = async (id) => {
            try {
                const res = await getEventById(id);
                setEvent(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load event.');
                setLoading(false);
            }
        };
        fetchEvent(id);
    }, [id]);

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">{error}</div>;
    }

    if (!event) {
        return <div className="text-center my-5">Event not found!</div>;
    }
    const selectedPrice = passType === "VIP" ? event.VIP_price : event.price;
    const totalAmount = selectedPrice * quantity;

    const data = {
        user_id: parsedUser.id,
        event_id: id,
        quantity: quantity,
        status: "pending",
        name: name,
        email: email,
        passType: passType,
        totalAmount: parseInt(totalAmount, 10),

    }

    const handleBooking = async (e) => {
        e.preventDefault();
        if (quantity <= 0) {
            Swal.fire("Warning!", "Quantity must be at least 1", "warning");
            return;
        }

        try {
            const res = await bookSlot(data);
            const modal = document.getElementById("exampleModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            Swal.fire({
                title: "Booking Confirmed!",
                html: `
        <p>Your booking is confirmed.</p>
        <strong>Booking ID:</strong> ${res.data.data.bookingId}<br/>
        <img src="${res.data.data.qr_code}" style="width:200px;height:200px;margin-top:10px"/>
      `,
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Booking failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }


    return (
        <div className="container my-5">
            <h2 className='text-center mb-4' style={{ color: "orange" }}>{event.title}</h2>

            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <img
                        src={event.image || "/dance1.jpg"}
                        alt={event.title}
                        className="img-fluid rounded-3 shadow-sm"
                        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                    />
                </div>

                <div className="col-12 col-md-6 shadow-sm d-flex flex-column justify-content-between p-3">
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h2 className="fw-bold">{event.title}</h2>
                            <h5 className='text-success'>Seats: {event.seats}</h5>
                        </div>
                        <p className="text-muted">{event.description}</p>

                        <div className="my-3">
                            <p><strong>Date:</strong> {event.start_date}</p>
                            <p><strong>Location:</strong> {event.location || "Not specified"}</p>
                            <p><strong>Price:</strong> ₹{event.price || 100}</p>
                            {event.VIP_price ? <p><strong>VIP Passes:</strong> ₹{event.VIP_price}</p> : ""}
                        </div>
                    </div>

                    <div className='d-flex justify-content-between mt-4'>
                        <button
                            type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            className="btn btn-warning text-white fw-bold"
                            style={{ borderRadius: "50px", maxWidth: "200px", flex: 1, marginRight: "10px" }}
                        >
                            Register / Buy Tickets
                        </button>

                        <button
                            className="btn btn-dark text-white fw-bold"
                            style={{ borderRadius: "50px", maxWidth: "200px", flex: 1, marginLeft: "10px" }}
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>
                    </div>

                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-primary" id="exampleModalLabel">{event.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-4 shadow-sm"
                                        id="name"
                                        placeholder="Enter your name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="name">Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control rounded-4 shadow-sm"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control rounded-4 shadow-sm"
                                        id="quantity"
                                        placeholder="Enter the Quantity"
                                        required
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min={0}
                                        max={5}
                                    />
                                    <label htmlFor="name">Quantity</label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Select Pass Type</label>
                                    <div className="d-flex gap-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="passType"
                                                id="normalPass"
                                                value="Normal"
                                                checked={passType === "Normal"}
                                                onChange={(e) => setPassType(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="normalPass">
                                                Normal Pass (₹{event.price})
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="passType"
                                                id="vipPass"
                                                value="VIP"
                                                checked={passType === "VIP"}
                                                onChange={(e) => setPassType(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="vipPass">
                                                VIP Pass (₹{event.VIP_price})
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={handleBooking}>
                                {totalAmount > 0 ? `Pay ₹${totalAmount}` : "Payment"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
