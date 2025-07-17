import express from "express";
const router = express.Router();

// Add a basic GET handler
router.get("/", (req, res) => {
  res.send("Gig route working ✅");
});

export default router;
