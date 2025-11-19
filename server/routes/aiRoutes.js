import express from 'express';
import { aiQuestionAns } from '../controller/aiController.js';

const router = express.Router();
router.post("/aiQues",aiQuestionAns);

export default router;