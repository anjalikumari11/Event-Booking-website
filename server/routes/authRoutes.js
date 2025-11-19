import express from "express";
import { getAllUsers, login, register } from "../controller/authController.js";

const router = express.Router();
router.post("/register",register);
router.post("/login", login);
router.get("/alluser",getAllUsers);

export default router;