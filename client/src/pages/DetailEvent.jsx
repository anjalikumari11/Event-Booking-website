import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addItemToWishlist, addRating, bookSlot, checkWishlistItem, getAllRating, getEventById, isAlreadyRate, ratingWithEvent_id, removeItem } from '../service/service';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaStar } from 'react-icons/fa';


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
    const [isLiked, setIsLiked] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isAlreadyReview, setIsAlreadyReview] = useState(false);

    const fetchReviews = async (id) => {
        try {
            const res = await ratingWithEvent_id(id);
            setReviews(res.data.data || "");
        } catch (error) {
            console.log(error);
        }
    }

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
        fetchReviews(id);

    }, [id]);

    const checkingReview = async () => {
        try {
            const data = {
                user_id: parsedUser.id,
                event_id: id
            }

            const res = await isAlreadyRate(data);

            if (res.data.message == "true") {
                setIsAlreadyReview(true);
            } else {
                setIsAlreadyReview(false);

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        const fetchWishlistStatus = async () => {
            try {
                const data = {
                    user_id: parsedUser.id,
                    event_id: id
                }

                const res = await checkWishlistItem(data);
                setIsLiked(res.data.exists);
            } catch (error) {
                console.error("Error checking wishlist:", error);
            }
        };
        fetchWishlistStatus();
        checkingReview();

    }, [user.id, id]);

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">{error}</div>;
    }

    if (!event) {
        return <div className="text-center my-5">Event not found!</div>;
    }
    const eventDate = new Date("2025-10-04T18:30:00.000Z");
    const formattedDate = eventDate.toISOString().split('T')[0];

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
        event_date: formattedDate

    }

    const handleBooking = async (e) => {
        e.preventDefault();
        if (quantity <= 0) {
            Swal.fire("Warning!", "Quantity must be at least 1", "warning");
            return;
        }

        try {
            const res = await bookSlot(data);
            
            Swal.fire({
                title: "Booking Confirmed!",
                html: `
        <p>Your booking is confirmed.</p>
        <p>Your booking id is also sent to you registered email.</p>
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

    const handleLike = async () => {
        try {
            const data = {
                user_id: parsedUser.id,
                event_id: parseInt(id),
                message:reviewText
            };

            if (!isLiked) {
                await addItemToWishlist(data);
                setIsLiked(true);
                Swal.fire({
                    title: "Added to wishlist",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                await removeItem(data);
                setIsLiked(false);
                Swal.fire({
                    title: "Removed from wishlist",
                    icon: "info",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }


        } catch (error) {
            console.error("Error while updating wishlist:", error);
            Swal.fire({
                title: "Something went wrong!",
                text: "Please try again later.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const data = {
                user_id: parsedUser.id,
                event_id: parseInt(id),
                rating: reviewRating,
                comment: reviewText
            };

            await addRating(data);

            Swal.fire("Success!", "Your review has been submitted.", "success");

            setReviews(prev => [...prev, { ...data, user_name: parsedUser.name }]);
            setReviewRating(0);
            setReviewText("");

        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Failed to submit review.", "error");
        }
    };


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
                        <div className="d-flex">
                            <div className="ms-auto" style={{ cursor: "pointer" }} >
                                {isLiked ?
                                    <FontAwesomeIcon icon={faHeart} color='red' onClick={handleLike} />
                                    :
                                    <FontAwesomeIcon icon={faHeart} onClick={handleLike} />
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h2 className="fw-bold">{event.title}</h2>
                            <h5 className='text-success'>Seats: {event.seats || "Limited seats"}</h5>
                        </div>
                        <p className="text-muted">{event.description}</p>

                        <div className="my-3">
                            <p><strong>Date:</strong> {formattedDate}</p>
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
                                        id="date"
                                        value={formattedDate}
                                        required
                                        readOnly
                                    />
                                    <label htmlFor="date">Event Date</label>
                                </div>
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

            <div className="mt-5">
                <h4 className="fw-bold mb-3">Reviews & Ratings</h4>

                {isAlreadyReview ?
                    ""
                    :
                    <form className="shadow-sm p-3 rounded mb-4" onClick={handleSubmitReview}>
                        <h5 className="mb-2">Submit Your Review</h5>
                        <div className="d-flex align-items-center mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <FaStar
                                    key={star}
                                    size={30}
                                    style={{ cursor: "pointer", marginRight: 5 }}
                                    color={star <= reviewRating ? "#FFC107" : "#e4e5e9"}
                                    onClick={() => setReviewRating(star)}
                                />
                            ))}
                        </div>
                        <textarea
                            className="form-control mb-2"
                            placeholder="Write your review..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={3}
                            required
                        />
                        <button className="btn btn-primary mt-2" type='submit' >
                            Submit Review
                        </button>
                    </form>
                }

                <div>
                    {reviews.length === 0 ? (
                        <p className="text-muted">No reviews yet.</p>
                    ) : (
                        reviews.map((rev, idx) => (
                            <div key={idx} className="shadow-sm p-3 rounded mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span>  {[1, 2, 3, 4, 5].map(star => (
                                        <FaStar
                                            key={star}
                                            size={20}
                                            color={star <= rev.rating ? "#FFC107" : "#e4e5e9"}
                                            style={{ marginRight: 2 }}
                                        />
                                    ))}</span>
                                    <span className="ms-2 fw-bold">{rev.user_name || "Anonymous"}</span>
                                </div>
                                <p className="mb-0">{rev.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
