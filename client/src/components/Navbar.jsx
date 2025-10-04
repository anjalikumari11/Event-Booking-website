import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [searchBar, setSearchBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg position-fixed top-0 w-100 px-4 transition`}
        style={{
          zIndex: "1099",
          background: scrolled ? "rgba(0, 0, 0, 0.85)" : "transparent",
          transition: "background 0.3s",
        }}
      >
        <a
          className="navbar-brand d-flex align-items-center text-light"
          href="#home"
          onClick={() => navigate("/")}
        >
          <img src={logo} height={45} className="me-2" />
          <strong>MyBrand</strong>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li onClick={() => setSearchBar(true)} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faSearch} className="nav-link text-light" />
            </li>
            <li className="nav-item"><a className="nav-link text-light" onClick={() => navigate("/")}>Home</a></li>
            <li className="nav-item"><a className="nav-link text-light" href="#about">About</a></li>

          </ul>
          {parsedUser ?
            <li className="nav-item">
              <a className="nav-link p-0" href="#profile">
                <img src={logo} height={30} style={{ borderRadius: "50%" }} />
              </a>
            </li>
            :
            <button
              className="btn ms-3 text-white"
              style={{ background: "orange", borderRadius: "30px" }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          }
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
    </>
  );
}

export default Navbar;
