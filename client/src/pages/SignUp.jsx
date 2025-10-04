import React, { useState } from 'react'
import video from "/video.mp4"
import { register } from '../service/service';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            console.log("All fields are required");
            return;
        }
        const role = "user";
        try {
            const data = { name, email, password, role };
            const res = await register(data);
            navigate('/signin');
        } catch (error) {
            console.log("Registration error:", error);
        }
    };


    return (
        <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="col-6 d-flex justify-content-center align-items-center"
                style={{
                    background: "linear-gradient(135deg, #1e1e2f, #42484d)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="p-5 shadow-lg"
                    style={{
                        background: "white",
                        borderRadius: "20px",
                        maxWidth: "450px",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <h2 className="fw-bold mb-2" style={{ color: "#ff6600" }}>
                        Welcome Back
                    </h2>
                    <p className="text-muted mb-4">Sign up to continue</p>

                    <form onSubmit={handleRegistration}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-4 shadow-sm"
                                id="name"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="name">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-4 shadow-sm"
                                id="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control rounded-4 shadow-sm"
                                id="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 text-light fw-semibold"
                            style={{
                                background: "#ff6600",
                                borderRadius: "30px",
                                padding: "12px 0",
                                transition: "0.3s",
                            }}
                        >
                            Sign Up
                        </button>

                        <div className="mt-4">
                            <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                                Already have an account?{" "}
                                <a onClick={()=>navigate("/signin")} style={{ color: "#ff6600", textDecoration: "none", fontWeight: "500" }}>
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <div className="col-6 p-0">
                <video
                    className="w-100 h-100"
                    autoPlay
                    loop
                    muted
                    style={{ objectFit: "cover" }}
                >
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default SignUp;
