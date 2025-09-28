import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function ReadyToYourWebsite() {
    return (
        <>
        <h4>Your Event, Your Way</h4>
        <div
            className="shadow-0 p-4 mt-0 text-left"
            style={{ background: "#f4f3f3", borderRadius: "10px", height: "37vh" }}
        >
            <h2 className="fw-bold mt-3">Ready to Host Your Own Events?</h2>
            <p className="text-secondary">Create and manage events on our platform</p>
            <button
                className="btn fw-bold text-light px-4"
                style={{ background: "orange", borderRadius: "20px", fontSize: "18px" }}
            >
                Create Your Event
            </button>

            <div className="position-relative">
                <div className="d-flex position-absolute end-0 mt-4 me-4 gap-3">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "50%",
                                background: "#e0e0e0",
                            }}
                        >
                            <FontAwesomeIcon icon={faFacebook} color="grey" size="lg" />
                        </span>
                    </a>

                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "50%",
                                background: "#e0e0e0",
                            }}
                        >
                            <FontAwesomeIcon icon={faLinkedin} color="grey" size="lg" />
                        </span>
                    </a>

                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "50%",
                                background: "#e0e0e0",
                            }}
                        >
                            <FontAwesomeIcon icon={faInstagram} color="grey" size="lg" />
                        </span>
                    </a>
                </div>
            </div>

        </div>
        </>

    );
}

export default ReadyToYourWebsite;
