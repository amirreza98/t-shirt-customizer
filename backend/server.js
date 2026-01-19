import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://thriving-bubblegum-aee085.netlify.app',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});