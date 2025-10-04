import React from 'react'
import video from "/video.mp4"
import { useState } from 'react'
import { login } from '../service/service';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("All fields are required");
            return;
        }
        try {
            const res = await login({ email, password });

            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/"); 
            } else {
                alert("Login failed, please try again.");
            }

        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Invalid credentials");
        }
    };


    return (
        <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>

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

            <div className="col-6 d-flex justify-content-center align-items-center" style={{
                background: "linear-gradient(135deg, #1e1e2f, #42484d)",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <form onSubmit={handleLogin}>
                    <div
                        className="p-5 shadow-lg"
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
                        <p className="text-muted mb-4">Sign in to continue</p>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-4 shadow-sm"
                                id="email"
                                placeholder="email"
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
                                placeholder="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button
                            className="btn w-100 text-light fw-semibold"
                            style={{
                                background: "#ff6600",
                                borderRadius: "30px",
                                padding: "12px 0",
                                transition: "0.3s",
                            }}
                            type='submit'

                        >
                            Log in
                        </button>

                        <div className="mt-4">
                            <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                                Don’t have an account?{" "}
                                <a href="/signup" style={{ color: "#ff6600", textDecoration: "none", fontWeight: "500" }}>
                                    Sign Up
                                </a>
                            </p>
                            <a href="/forgot-password" style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignIn
