import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/db.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve()

dotenv.config();
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
// app.use(cors());
app.use(cookieParser());
// app.use(morgan("dev"));

connectDB();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

///////////////////////////////////////////////////////////////////

server.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
