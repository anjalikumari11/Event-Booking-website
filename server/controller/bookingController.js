import db from "../config/db.js";
import QRCode from "qrcode";

export const BookSlot = async (req, res) => {
    try {
        const { user_id, event_id, quantity, status, name, email, passType, totalAmount } = req.body;
        const bookingId = "BOOK" + Date.now();
        const bookingUrl = `http://localhost:5173/booking/${bookingId}`;

        const qr_data = await QRCode.toDataURL(bookingUrl);

        const sql = "INSERT INTO bookings (user_id, event_id, quantity, status, created_at, updated_at, name, email, passType, totalAmount,booking_id, qr_data) VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?, ?,?)";
        const [result] = await db.execute(sql, [user_id, event_id, quantity, status, name, email, passType, totalAmount, bookingId, qr_data,]);
        res.json({
            message: "Booking created successfully!",
            data: {
                status: "successful",
                bookingId: `${bookingId}`,
                qr_code: `${qr_data}`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const showAllBookings = async (req, res) => {
    try {
        const sql = "SELECT * FROM bookings";
        const [rows] = await db.query(sql);
        res.status(200).json({
            message: "All data fetched successfully",
            data: rows
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error Fetching all event",
            error: error.message
        });
    }
}

export const getBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const sql = "SELECT * FROM bookings WHERE booking_id =?";
        const [rows] = await db.query(sql, [bookingId]);
        if (rows.length > 0) {
            res.status(200).json({
                message: "data fetched successfully",
                data: rows[0]
            });
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error Fetching all event",
            error: error.message
        });
    }
}

