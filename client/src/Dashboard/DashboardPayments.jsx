import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { getBookingDetails } from '../service/service';

function DashboardPayments() {
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  console.log(user);
  
  const user_id = user.id;

  useEffect(() => {
    const fetchBooking = async (user_id) => {
      try {
        const res = await getBookingDetails(user_id);
        setTransactions(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user_id) fetchBooking(user_id);
  }, [user_id]);

  return (
      <div className="p-4">
        <h3 className="mb-4 text-danger">All Transactions</h3>
        
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount ($)</th>
                    <th scope="col">Pass Type</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((t, index) => (
                      <tr key={t.id}>
                        <td>{index + 1}</td>
                        <td>{t.booking_id}</td>
                        <td>{t.quantity}</td>
                        <td>{t.totalAmount}</td>
                        <td>{t.passType}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DashboardPayments;
