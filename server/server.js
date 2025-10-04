import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import userSayRoutes from "./routes/userSayRoutes.js";
import cors from "cors";
// import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use("/uploads", express.static("uploads"));
app.use("/UserSay",express.static("UserSay"));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/event", eventRoutes);
app.use("/booking",bookingRoutes)
app.use("/images",imageRoutes);
app.use("/userWords",userSayRoutes)

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
