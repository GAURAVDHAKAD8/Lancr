import express from "express";
import { deleteUser } from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/jwt.js";

const router = express.Router();

// Add a basic GET handler
router.delete("/:id", verifyToken,deleteUser);

export default router;
