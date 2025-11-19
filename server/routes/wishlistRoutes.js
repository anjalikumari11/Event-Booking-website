import express from "express";
import { addItemInWishlist, checkItemInWishlist, deleteItemFromWishlist, getItemByUserId } from "../controller/wishlistController.js";

const router = express.Router();
router.post("/addItem",addItemInWishlist);
router.delete("/deleteItem",deleteItemFromWishlist);
router.get("/:user_id",getItemByUserId);
router.post("/check",checkItemInWishlist);

export default router;