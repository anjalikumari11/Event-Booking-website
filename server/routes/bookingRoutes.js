import express from "express";
import { BookSlot, getBookingById, showAllBookings} from "../controller/bookingController.js";

const router = express.Router();
router.post("/book",BookSlot);
router.get("/",showAllBookings);
router.get("/bookingid/:bookingId",getBookingById);

export default router;