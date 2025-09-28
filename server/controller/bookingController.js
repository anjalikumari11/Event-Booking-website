import db from "../config/db.js";

export const BookSlot = async (req, res) => {
    try {
        const { user_id, event_id, quantity } = req.body;
        const status = "pending";
        const sql = "INSERT INTO bookings (user_id, event_id, quantity, status) VALUES (?, ?, ?, ?)";
        const [result] = await db.execute(sql, [user_id, event_id, quantity, status]);
        res.json({ message: "Booking created successfully!" });
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
        const { id } = req.params;
        const sql = "SELECT * FROM bookings WHERE id =?";
        const [rows] = await db.query(sql, [id]);
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

