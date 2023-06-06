import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./Config/Database.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import userRouter from "./Routes/userRoute.js";
import productRouter from "./Routes/productRoute.js";
import paymentRouter from "./Routes/paymentRoute.js";
import orderRouter from "./Routes/orderRoute.js";
const app = express();
dotenv.config({ path: "../server/Config/config.env" });

// Connecting To Database
connectToDatabase();

// Using Body-Parser
app.use(bodyParser.json({ extended: true, limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// Using CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Using Cookie-Parser
app.use(cookieParser());

// Using Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Declaring Routes
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);

// Running App on Server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port ${process.env.PORT}`);
});
