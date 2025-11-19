import express from "express";
import { addRating, allWithSameEventId, getAllRating, isRateById } from "../controller/ratingController.js";

const router = express.Router();
router.post("/addRating",addRating);
router.get("/all",getAllRating);
router.post("/check",isRateById);
router.get("/:event_id",allWithSameEventId)

export default router;