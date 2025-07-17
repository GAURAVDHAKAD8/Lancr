import express from "express";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// Add a basic GET handler
router.delete("/:id", deleteUser);

export default router;
