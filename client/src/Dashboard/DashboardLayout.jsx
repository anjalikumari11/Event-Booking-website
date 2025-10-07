import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import UserAnalytics from './UserAnalytics';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div style={{ width: '250px' }}>
        <DashboardSidebar />
      </div>

      <div
        className="flex-grow-1"
        style={{
          borderRadius: '20px 0 0 20px',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <DashboardNavbar />
        <div className="flex-grow-1 overflow-auto">
         <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
