import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verify.js";


const router = express.Router();

router.get('/test/:id', getUser);
router.post('/update/:id', verifyToken, updateUser)

export default router;
