import express from "express";
import { bookingById, BookSlot, deleteBooking, getBookingBybookingId, showAllBookings} from "../controller/bookingController.js";

const router = express.Router();
router.post("/book",BookSlot);
router.get("/",showAllBookings);
router.get("/bookingid/:bookingId",getBookingBybookingId);
router.get("/book/:user_id",bookingById);
router.delete("/:id",deleteBooking);

export default router;