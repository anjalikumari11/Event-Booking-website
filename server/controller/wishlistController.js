import db from "../config/db.js";

export const addItemInWishlist = async (req,res) =>{
    try{
        const {user_id,event_id} = req.body;
        const sql = "INSERT INTO wishlists (user_id,event_id) VALUES (?,?)";
        const [result] = await db.execute(sql,[user_id,event_id]);
        res.json({
            message:"Insert successfully",
            data:{
                status:"successful",
                data:{
                    user_id:`${user_id}`,
                    event_id:`${event_id}`
                }
            }
        })
    }catch(error){
        console.log(error);
    }
}

export const deleteItemFromWishlist = async (req,res) =>{
    try {
        const {user_id,event_id} = req.body;
        const sql = "DELETE FROM wishlists WHERE user_id = '?' AND event_id= '?' ";
        const [result] = await db.query(sql,[user_id,event_id]);
         res.json({
            message:"deleted successfully",  
        })
    } catch (error) {
      console.log(error);
      
    }
}

export const getItemByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const sql = `SELECT e.* FROM wishlists w INNER JOIN events e ON e.id = w.event_id WHERE w.user_id=?`;

    const [result] = await db.query(sql, [user_id]);

    if (result.length === 0) {
      return res.status(404).json({
        message: "No wishlist found for this user",
      });
    }

    res.status(200).json({
      message: "Wishlist fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkItemInWishlist = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    const sql = "SELECT * FROM wishlists WHERE user_id = ? AND event_id = ?";
    const [rows] = await db.query(sql, [user_id, event_id]);

    if (rows.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

