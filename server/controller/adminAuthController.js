import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO admins (name,email,password) VALUES(?,?,?)";
        const [rows] = await db.query(sql, [name, email, hashedPassword])

        const [result] = await db.query("SELECT name,email FROM admins WHERE id =?", [rows.insertId]);
        res.status(201).json({
            message: "User registered successfully",
            data: result[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering admin",
            
        });
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.query("SELECT * FROM admins WHERE email=?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        res.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email}
        });
        
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
}