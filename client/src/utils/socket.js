import { io } from "socket.io-client";

export const socket = io("http://localhost:8800", {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection events
socket.on("connect", () => {
  console.log("🔗 Connected to socket:", socket.id);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser?._id) {
    socket.emit("addUser", currentUser._id);
  }
});

socket.on("disconnect", () => {
  console.log("🔌 Disconnected from socket");
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});
