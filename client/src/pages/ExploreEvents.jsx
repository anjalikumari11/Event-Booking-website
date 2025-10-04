import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./explore.css";
import Footer from '../components/Footer';
import { allEvents } from '../service/service';
import { motion } from "framer-motion";

function ExploreEvents() {
    const [filter, setFilter] = useState("all");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await allEvents();
                setEvents(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, []);

    const handleViewDetails = (event) => {
        alert(`You clicked on: ${event.title}`);
    };

    return (
        <>
            <div
                className="ExplorePage"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #2e2e2e, #505050)",
                    paddingBottom: "60px"
                }}
            >
                <Navbar />

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center py-4"
                >
                    <h2 className="fw-bold" style={{ color: "#ffcc00" }}>Explore Exciting Events </h2>
                    <p className="text-light">Find events happening around you and join the fun!</p>
                </motion.div>

                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="ExploreEventContainer d-flex justify-content-center gap-4 list-unstyled fw-semibold mb-4 flex-wrap"
                >
                    {["all", "weekend", "month", "year"].map((cat) => (
                        <li
                            key={cat}
                            className={`px-3 py-2 rounded-pill ${filter === cat ? "bg-warning text-dark" : "text-light"}`}
                            style={{
                                cursor: "pointer",
                                transition: "0.3s",
                                boxShadow: filter === cat ? "0px 4px 12px rgba(0,0,0,0.3)" : "none"
                            }}
                            onClick={() => setFilter(cat)}
                        >
                            {cat === "all" ? "All Events" :
                                cat === "weekend" ? "This Weekend" :
                                    cat === "month" ? "Month" : "Year"}
                        </li>
                    ))}
                </motion.ul>

                <div className="container-fluid row g-4 px-4">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            className="col-12 col-md-4 col-lg-3"
                            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div
                                className="card shadow-lg border-0 h-100 event-card"
                                style={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    background: "#fff",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <motion.img
                                    src={event.image}
                                    className="card-img-top"
                                    height={180}
                                    alt={event.title}
                                    style={{ objectFit: "cover" }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold mb-2">{event.title}</h5>
                                    <p className="card-text text-muted flex-grow-1">{event.desc}</p>
                                    <motion.button
                                        whileHover={{ scale: 1.1, backgroundColor: "#ff9900" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleViewDetails(event)}
                                        className="btn fw-bold text-white mt-2 align-self-start px-4"
                                        style={{
                                            borderRadius: "30px",
                                            background: "linear-gradient(45deg, #ff6600, #ff9900)",
                                            border: "none"
                                        }}
                                    >
                                        View Details
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ExploreEvents;
