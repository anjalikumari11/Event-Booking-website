import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function DashboardNavbar() {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-between align-items-center border-bottom p-3 px-4"
      style={{
        borderRadius: '20px 0 0 0',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <h5 className="m-0 fw-bold text-secondary" onClick={()=>navigate('/')}>
        Dashboard
      </h5>

      <div className="d-flex align-items-center gap-4">
        <FontAwesomeIcon icon={faBell} className="text-secondary fs-5" style={{ cursor: 'pointer' }} />
        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faUserCircle} className="text-danger fs-4" />
          <span className="fw-semibold text-dark">{parsedUser.name}</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
