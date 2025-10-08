import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
      <h5 className="m-0 fw-bold text-secondary"
      onClick={()=>navigate("/")}>
        Home
      </h5>

        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
          <div className="nav-item position-relative">
            {parsedUser.profilePic ?
              <img
                src={parsedUser.profilePic}
                alt="profile"
                height={35}
                width={35}
                style={{ borderRadius: "50%", cursor: "pointer", objectFit: "cover" }}
              />
              :
              <div className='d-flex fw-bold text-danger justify-content-center align-items-center gap-2'>
                <div
                  style={{
                    borderRadius: "50%", cursor: "pointer", objectFit: "cover", height: "40px", width: "40px", backgroundColor: "#FFA500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {parsedUser.name ? parsedUser.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  {parsedUser.name}
                </div>
              </div>
            }

          </div>
        </div>
      </div>
  );
}

export default DashboardNavbar;
