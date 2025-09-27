import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
         const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())";
        db.query(sql, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err });
            }
            res.status(201).json({ message: "User registered successfully", userId: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};
 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // const token = jwt.sign(
        //     { id: user.id, email: user.email, role: user.role },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "1d" }
        // );
        // res.json({ message: "Login successful", token });
        res.json({message:"login successfully"})
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
}
