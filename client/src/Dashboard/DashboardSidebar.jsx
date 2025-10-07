import { faCalendar, faMoneyBill, faUser, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardSidebar() {
  const [active, setActive] = useState('Analytics');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Analytics', icon: faChartLine, path: '' },
    { name: 'Payments', icon: faMoneyBill, path: 'payments' },
    { name: 'Calendar', icon: faCalendar, path: 'calendar' },
    { name: 'Profile', icon: faUser, path: 'profile' },
    { name: 'Logout', icon: faSignOutAlt, path: 'logout' },
  ];

  const handleSidebarClick = (item) => {
    setActive(item.name);

    if (item.name === 'Logout') {
        localStorage.clear();
        navigate('/');
      return;
    }

    navigate(`/dashboard/${item.path}`);
  };

  return (
    <div
      className="p-3 shadow-sm"
      style={{
        width: '250px',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fff 0%, #f8f9fa 100%)',
        borderRight: '2px solid #e77e7eff',
        borderRadius: '0 20px 20px 0',
      }}
    >
      <h4
        className="p-3 mb-4 text-center fw-bold"
        style={{ borderBottom: '2px solid #dc3545', color: '#333', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <span className="text-danger">Event</span>Booking
      </h4>

      <ul className="list-unstyled m-0">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`d-flex align-items-center gap-3 mb-3 px-3 py-2`}
            style={{
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: active === item.name ? '600' : '500',
              backgroundColor: active === item.name ? '#f8d7da' : 'transparent',
            }}
            onClick={() => handleSidebarClick(item)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.3)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <FontAwesomeIcon
              icon={item.icon}
              style={{ color: active === item.name ? '#dc3545' : '#555', fontSize: '18px' }}
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardSidebar;
