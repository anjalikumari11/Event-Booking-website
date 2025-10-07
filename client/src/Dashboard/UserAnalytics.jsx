import React from 'react';
import DashboardLayout from './DashboardLayout';

function UserAnalytics() {
    return (
        <div className="p-4">
            <h3 className="mb-4 text-danger fw-bold">Analytics Dashboard</h3>

            <div className="d-flex flex-wrap gap-3 mb-4">
                <div
                    className="p-3 flex-grow-1 text-center"
                    style={{
                        backgroundColor: '#ffcccc',
                        borderRadius: '12px',
                        minWidth: '180px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <h6>Total Bookings</h6>
                    <h3 className="fw-bold">1,245</h3>
                </div>

                <div
                    className="p-3 flex-grow-1 text-center"
                    style={{
                        backgroundColor: '#cce5ff',
                        borderRadius: '12px',
                        minWidth: '180px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <h6>Total Revenue</h6>
                    <h3 className="fw-bold">$32,400</h3>
                </div>

                <div
                    className="p-3 flex-grow-1 text-center"
                    style={{
                        backgroundColor: '#d4edda',
                        borderRadius: '12px',
                        minWidth: '180px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <h6>Active Users</h6>
                    <h3 className="fw-bold">765</h3>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8 col-12">
                    <div className="d-flex justify-content-center row gap-3">
                        <div
                            className="col-md-5 col-12 p-3 text-light"
                            style={{
                                backgroundColor: '#6f42c1',
                                borderRadius: '12px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h5>Bookings Today</h5>
                            <p className="fs-4 fw-bold">120</p>
                        </div>
                        <div
                            className="col-md-5 col-12 p-3 text-light"
                            style={{
                                backgroundColor: '#fd7e14',
                                borderRadius: '12px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h5>New Users</h5>
                            <p className="fs-4 fw-bold">45</p>
                        </div>
                        <div
                            className="col-md-5 col-12 p-3 text-light"
                            style={{
                                backgroundColor: '#20c997',
                                borderRadius: '12px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h5>Pending Payments</h5>
                            <p className="fs-4 fw-bold">15</p>
                        </div>
                        <div
                            className="col-md-5 col-12 p-3 text-light"
                            style={{
                                backgroundColor: '#0d6efd',
                                borderRadius: '12px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h5>Cancelled Bookings</h5>
                            <p className="fs-4 fw-bold">5</p>
                        </div>
                    </div>
                </div>

                {/* Right Section: Calendar / Placeholder */}
                <div
                    className="col-lg-4 col-12 p-3"
                    style={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        minHeight: '300px',
                    }}
                >
                    <h5 className="mb-3">Calendar</h5>
                    <p className="text-muted">Your calendar or event schedule goes here...</p>
                </div>
            </div>
        </div>
    );
}

export default UserAnalytics;
