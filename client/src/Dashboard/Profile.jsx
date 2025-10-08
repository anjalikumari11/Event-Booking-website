import React, { useEffect, useState } from 'react';
import { getBookingDetails } from '../service/service';

function Profile() {
    const [transactions, setTransactions] = useState([]);

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const user_id = user.id;

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await getBookingDetails(user_id);
                setTransactions(res.data.data);
            } catch (error) {
                console.log("Error fetching bookings:", error);
            }
        };

        if (user_id) fetchBooking();
    }, [user_id]);

    const totalBookings = transactions.length;
    const upcomingEvents = transactions.filter(item => new Date(item.event_date) > new Date()).length;
    const completedEvents = transactions.filter(item => new Date(item.event_date) <= new Date()).length;
    const totalSpent = transactions.reduce(
        (sum, item) => sum + (Number(item.totalAmount) || 0),
        0
    )
    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4 d-flex flex-row align-items-center gap-4">
                <img
                    src="/logo.png"
                    alt="Profile"
                    height={150}
                    width={150}
                    className="border rounded-circle object-fit-cover"
                />
                <div>
                    <h3 className="mb-2 fw-bold text-danger">{user.name || "Guest User"}</h3>
                    <p className="mb-1 text-muted">Email: {user.email || "Not provided"}</p>
                    <p className="text-muted">Role: {user.role || "User"}</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-3 ">
                    <div className="card text-light border-0 bg-primary text-center p-3 shadow-sm">
                        <h5>Total Bookings</h5>
                        <h3>{totalBookings}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-light border-0 bg-warning text-center p-3 shadow-sm">
                        <h5>Upcoming Events</h5>
                        <h3>{upcomingEvents}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-light border-0 bg-success text-center p-3 shadow-sm">
                        <h5>Completed</h5>
                        <h3>{completedEvents}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-light border-0 bg-danger text-center p-3 shadow-sm">
                        <h5>Total Spent</h5>
                        <h3>₹{totalSpent}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
