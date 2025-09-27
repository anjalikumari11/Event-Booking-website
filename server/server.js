import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/event", eventRoutes);
app.use("/booking",bookingRoutes)

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
