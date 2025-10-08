import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getBookingDetails } from '../service/service';

export default function DashboardCalender() {
    const [value, onChange] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    useEffect(() => {
        async function fetchBooking() {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await getBookingDetails(user.id);

            const eventDates = res.data.data.map(item => new Date(item.event_date));
            setBookedDates(eventDates)
        }
        fetchBooking();
    }, [])

    return (
        <>
            <div>
                <Calendar
                    tileClassName={({ date, view }) => {
                        if (view == "month") {
                            const isBooked = bookedDates.some((d) => d.toDateString() === date.toDateString())
                            return isBooked ? 'booked-date' : null;
                        }
                    }}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </>
    );
}