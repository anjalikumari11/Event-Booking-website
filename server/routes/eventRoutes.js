import express from "express";
import { addEvent, deleteEvent, getAllEvent, getEventById, searchByCategory, updateEvent } from "../controller/eventController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,'uploads/'),
      filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({storage});

router.post("/addEvent",upload.single('image'),addEvent);
router.get("/",getAllEvent);
router.get('/:id', getEventById);
router.put("/edit/:id",updateEvent);
router.delete("/:id",deleteEvent);
router.get("/category/:cat",searchByCategory);

export default router;