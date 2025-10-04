import db from "../config/db.js";

export const addEvent = async (req, res) => {
    try {
        const { title, description, start_date, end_date, organizer_id, location, price, event_date, vip_price, seats } = req.body;
        const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

        if (!title || !description || !end_date || !organizer_id || !image || !price) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const sql = `
            INSERT INTO events 
            (title, description, start_date, end_date, organizer_id, location, image, price, event_date, VIP_price, seats)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [title, description, start_date, end_date, organizer_id, location, image, price, event_date, vip_price, seats], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err });
            }
            res.status(201).json({ message: "Event registered successfully", eventId: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering event", error: err.message });
    }
};


export const getAllEvent = async (req, res) => {
    try {
        const sql = "SELECT * FROM events";
        const [rows] = await db.query(sql);
        res.status(200).json({
            message: "All data fetched successfully",
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching all event",
            error: error.message
        });
    }
};


export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM events WHERE id = ?";
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
        res.status(500).json({
            message: "Error Fetching event",
            error: error.message
        });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { title, description, start_date, end_date, category, price } = req.body;
        const { id } = req.params;

        const sql = "UPDATE events SET title=?, description=?, start_date=?, end_date=?, category=?,price=? WHERE id=?";
        const [result] = await db.query(sql, [title, description, start_date, end_date, category, price, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Event updated successfully" });
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating event",
            error: error.message
        });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM events WHERE id=?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Event deleted successfully" });
        } else {
            res.status(404).json({ message: "Event not found" });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error deleting event",
            error: error.message
        });
    }
}

export const searchByCategory = async (req, res) => {
    try {
        const { cat } = req.params;
        const sql = "SELECT * FROM events WHERE category = ?";
        const [rows] = await db.query(sql, [cat]);
        if (rows.length > 0) {
            res.status(200).json({
                message: "data fetched successfully",
                data: rows[0]
            });
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting event",
            error: error.message
        });
    }
}