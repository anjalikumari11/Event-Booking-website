import React, { useEffect, useState } from 'react';
import { getBookingDetails, getEventById } from '../service/service';
import { QRCodeCanvas } from "qrcode.react";

function Tickets() {
    const [transactions, setTransactions] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const user_id = user.id;

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await getBookingDetails(user_id);
                const bookings = res.data.data;

                const eventDetails = await Promise.all(
                    bookings.map(b => getEventById(b.event_id))
                );

                const merged = bookings.map((b, i) => ({
                    ...b,
                    event: eventDetails[i].data.data,
                }));

                setTransactions(merged);
            } catch (error) {
                console.log(error);
            }
        };

        if (user_id) fetchBooking();
    }, [user_id]);

    return (
        <div className="container d-flex flex-wrap gap-4 justify-content-center p-4">
            {transactions.map((v, index) => (
                <div
                    key={v.id || index}
                    className="ticket-card bg-light shadow-lg"
                    style={{
                        width: '320px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        border: `${v.passType === "Normal" ? "2px dashed #198754" : "2px dashed #b93878"}`,
                        position: 'relative',
                    }}
                >
                    <div
                        className="bg-success text-light text-center py-3"
                        style={{ borderBottom: '2px dashed white' }}
                    >
                        <h4 className="fw-bold mb-1">{v.event?.name || "Event Ticket"}</h4>
                        <p className="mb-0 small">{v.passType || "General"}</p>
                    </div>

                    <div className='d-flex justify-content-evenly'>

                        <div className="p-3 text-dark">
                            <p><strong>Date:</strong> {v.event?.event_date || "TBA"}</p>
                            <p><strong>Time:</strong> {v.event?.start_date || "TBA"}</p>
                            <p><strong>Venue:</strong> {v.event?.location || "City Hall, Noida"}</p>
                            <p><strong>Seat:</strong> {v.quantity || "A12"}</p>
                        </div>

                        <div className='p-2'>
                            

                            {v.qr_data && (
                           <>
                            <button
                                className="btn btn-outline-success btn-sm mt-2"
                                onClick={() => {
                                    const a = document.createElement('a');
                                    a.href = v.qr_data;
                                    a.download = `ticket-${v.booking_id}.png`;
                                    a.click();
                                }}
                            >
                                Download QR
                            </button>
                                <div className="text-center my-1">
                                    <img
                                        src={v.qr_data}
                                        alt="QR Code"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                    <p className="small mt-2 text-secondary">Scan to verify ticket</p>
                                </div>
                           </>
                            )}

                        </div>
                    </div>

                    <div
                        className="bg-success text-center text-light py-2"
                        style={{ borderTop: '2px dashed white' }}
                    >
                        <p className="mb-0 small">Booking ID: #{v.booking_id || "TCKT98765"}</p>
                    </div>

                    <div style={{
                        position: 'absolute', top: '50%', left: '-10px',
                        transform: 'translateY(-50%)', background: 'white',
                        borderRadius: '50%', width: '20px', height: '20px',
                    }}>

                    </div>
                    <div style={{
                        position: 'absolute', top: '50%', right: '-10px',
                        transform: 'translateY(-50%)', background: 'white',
                        borderRadius: '50%', width: '20px', height: '20px',
                    }}>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Tickets;
