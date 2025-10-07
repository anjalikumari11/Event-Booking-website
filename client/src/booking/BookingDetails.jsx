import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketsById } from "../service/service";

export default function BookingDetail() {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchDetail = async (bookingId) => {
            try {
                const res = await getTicketsById(bookingId);
                setBooking(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDetail(bookingId);
    }, [bookingId]);

    if (!booking) return <p>Loading booking details...</p>;

    return (
        <div className="container my-5">
            <h2>Booking Details</h2>
            <p><strong>Booking ID:</strong> {booking.booking_id}</p>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Event ID:</strong> {booking.event_id}</p>
            <p><strong>Quantity:</strong> {booking.quantity}</p>
            <p><strong>Pass Type:</strong> {booking.passType}</p>
        </div>
    );
}
