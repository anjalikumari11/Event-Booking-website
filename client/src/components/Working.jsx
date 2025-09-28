import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

function Working() {
    return (
        <div
            className="shadow-0 p-3 text-left"
            style={{ background: "#f4f3f3", borderRadius: "10px" }}
        >
            <h3 className="text-center my-2">How It Works</h3>
            <Swiper
                modules={[FreeMode, Mousewheel]}
                freeMode={true}        
                mousewheel={true}      
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SwiperSlide key={i}>
                        <div className="card shadow-sm border-0 text-center p-4 mx-auto mb-3"
                            style={{ borderRadius: "20px", maxWidth: "400px" }}
                        >
                            <div
                                className="rounded-circle mb-3 mx-auto d-flex justify-content-center align-items-center "
                                style={{ height: "80px", width: "80px", background: "#f4f3f3" }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faCalendar} size={"2x"} color="orange" />
                                </div>
                            </div>
                            <p className="card-text">
                                "Great experience, I loved the learning process."
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Working;
