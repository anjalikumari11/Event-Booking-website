import express from "express";
import { addUserSay, getUsersWord } from "../controller/UserSayController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,'UserSay/'),
      filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const UserWords = multer({storage});

router.post('/addUserSay',UserWords.single('image'),addUserSay,);
router.get('/',getUsersWord);

export default router;