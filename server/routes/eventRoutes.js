import express from "express";
import { addEvent, deleteEvent, getAllEvent, getEventById, updateEvent } from "../controller/eventController.js";

const router = express.Router();
router.post("/addEvent",addEvent);
router.get("/",getAllEvent);
router.get('/:id', getEventById);
router.put("/edit/:id",updateEvent);
router.delete("/:id",deleteEvent);

export default router;