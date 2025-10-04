import db from "../config/db.js";

export const addUserSay = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file
      ? `http://localhost:5000/UserSay/${req.file.filename}`
      : null;

    if (!name || !description || !image) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const sql = "INSERT INTO usersay (name, description, image) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, description, image]);

    res.status(201).json({
      message: "UserSay added successfully",
      userSayId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding UserSay",
      error: error.message,
    });
  }
};

export const getUsersWord = async (req,res) =>{
    try {
        const sql = "SELECT * FROM usersay";
        const [result] = await db.query(sql);
        res.status(201).json({
            message:"Fetch successfully",
            data:result
        })
    } catch (error) {
        res.status(500).json({
      message: "Error fetching UserSay",
      error: error.message,
    });
    }
}