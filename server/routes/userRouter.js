import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verify.js";


const router = express.Router();

router.get('/test/:id', getUser);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)

export default router;
