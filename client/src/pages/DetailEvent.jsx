import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../service/service';

export default function DetailEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        <h2 className="fw-bold">{event.title}</h2>
                        <p className="text-muted">{event.description}</p>

                        <div className="my-3">
                            <p><strong>Date:</strong> {event.start_date}</p>
                            <p><strong>Location:</strong> {event.location || "Not specified"}</p>
                            <p><strong>Price:</strong> ₹{event.price || 100}</p>
                        </div>
                    </div>

                    <div className='d-flex justify-content-between mt-4'>
                        <button
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
        </div>
    );
}
