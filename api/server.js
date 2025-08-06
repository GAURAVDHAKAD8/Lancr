import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import { authRoute } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server

app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery", true);

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// ✅ CORS for Express (REST API)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://lancr.vercel.app", // deployed frontend
    ],
    credentials: true,
  })
);

// ✅ CORS for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://lancr.vercel.app"],
    credentials: true,
  },
});

// Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`📌 User joined conversation: ${conversationId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// Start server
httpServer.listen(8800, () => {
  Connect();
  console.log("🚀 Server is running on port 8800");
});
