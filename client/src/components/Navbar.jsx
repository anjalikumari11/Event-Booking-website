import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 position-relative">
      
      <a className="navbar-brand d-flex align-items-center" href="#home">
        <img src={logo} height={45} className="me-2" />
       <strong>MyBrand</strong>
      </a>

      <div className="search-container position-absolute top-50 start-50 translate-middle">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
          <li className="nav-item border" style={{borderRadius:"50%"}}><a className="nav-link" href="#profile"><img src={logo} height={30} style={{borderRadius:"50%"}} /></a></li>
        </ul>
        <button className="btn btn-orange ms-3 text-white" style={{background:"orange"}}>Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
