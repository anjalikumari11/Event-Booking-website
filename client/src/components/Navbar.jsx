import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch, faUser, faSignOutAlt, faDashboard, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [searchBar, setSearchBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg position-fixed top-0 w-100 px-4 transition`}
        style={{
          zIndex: 1099,
          background: scrolled ? "rgba(0, 0, 0, 0.85)" : "transparent",
          transition: "background 0.3s",
        }}
      >
        <a
          className="navbar-brand d-flex align-items-center text-light"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} height={45} className="me-2" />
          <strong>PartyPass</strong>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" color="white"></FontAwesomeIcon>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li onClick={() => setSearchBar(true)} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faSearch} className="nav-link text-light" />
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" onClick={() => navigate("/")}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" onClick={() => navigate("/about")}>
                About
              </a>
            </li>

            {parsedUser ? (
              <div className="nav-item position-relative">
                {parsedUser.profilePic ?
                  <img
                    src={parsedUser.profilePic}
                    alt="profile"
                    height={35}
                    width={35}
                    style={{ borderRadius: "50%", cursor: "pointer", objectFit: "cover" }}
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  :
                  <div
                    style={{
                      borderRadius: "50%", cursor: "pointer", objectFit: "cover", height: "40px", width: "40px", backgroundColor: "#FFA500", // optional: a background color
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    onClick={() => setShowDropdown(!showDropdown)}>
                    {parsedUser.name ? parsedUser.name.charAt(0).toUpperCase() : "U"}
                  </div>
                }
                {showDropdown && (
                  <ul
                    className="position-absolute bg-dark text-light list-unstyled shadow-lg p-2 mt-2"
                    style={{
                      right: 0,
                      borderRadius: "10px",
                      minWidth: "180px",
                      zIndex: 2000,
                      animation: "fadeIn 0.3s ease-in-out",
                    }}
                  >
                    <li
                      className="dropdown-item text-light py-2 px-3"
                      style={{ cursor: "pointer" }}
                      onClick={handleDashboard}
                    >
                      <FontAwesomeIcon icon={faDashboard} className="me-2" />
                      Dashboard
                    </li>
                    <li
                      className="dropdown-item text-light py-2 px-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Profile
                    </li>
                    <hr style={{ margin: "4px 0", borderColor: "gray" }} />
                    <li
                      className="dropdown-item text-light py-2 px-3"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button
                className="btn ms-3 text-white"
                style={{ background: "orange", borderRadius: "30px" }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            )}
          </ul>
        </div>
      </nav>

      {searchBar && (
        <div
          className="search-overlay position-fixed top-0 start-0 w-100 d-flex flex-column align-items-center justify-content-center"
          style={{
            height: "100vh",
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            transition: "opacity 0.3s",
          }}
        >
          <button
            className="btn text-light position-absolute top-0 end-0 m-3"
            onClick={() => setSearchBar(false)}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
          <form className="w-75">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search events, shows..."
                autoFocus
              />
              <button className="btn btn-light" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      )}

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </>
  );
}

export default Navbar;
