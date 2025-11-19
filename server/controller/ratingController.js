import db from "../config/db.js";

export const addRating = async (req, res) => {
    try {
        const { user_id, event_id, rating, comment } = req.body;


        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const sql = "INSERT INTO ratings (user_id, event_id, rating,comment) VALUES (?, ?, ?,?)";
        const [rows] = await db.query(sql, [user_id, event_id, rating, comment]);

        res.status(201).json({
            message: "Inserted successfully",
            ratingId: rows.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Backend error"
        });
    }
};


export const getAllRating = async (req, res) => {
    try {
        const [row] = await db.query("SELECT * FROM ratings");
        res.status(201).json({
            message: "fetch successfully",
            data: row
        })
    } catch (error) {
        res.status(501).json({
            message: "backend error"
        })
    }
}

export const isRateById = async (req, res) => {
    try {
        const { user_id, event_id } = req.body;
        const sql = "SELECT * FROM ratings WHERE event_id=? AND user_id=?";
        const [rows] = await db.query(sql, [event_id, user_id]);  

        if (rows.length > 0) {
            return res.status(200).json({ message: "true" });
        } else {
            return res.status(200).json({ message: "false" });
        }
    } catch (error) {
        res.status(501).json({
            message: "backend error"
        })
    }
}

export const  allWithSameEventId = async(req,res)=>{
    try {
        const {event_id} = req.params;
        const sql = "SELECT * FROM ratings WHERE event_id=?";
        const [ rows] = await db.query(sql,[event_id]);

        if(rows.length > 0){
            return res.status(200).json({
                message:"fetched successfully",
                data:rows
            })
        }else {
            return res.status(200).json({ message: "false" });
        }
    } catch (error) {
         res.status(501).json({
            message: "backend error"
        })
    }
}