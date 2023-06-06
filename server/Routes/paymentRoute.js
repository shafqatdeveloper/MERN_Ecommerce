import express from "express";
import { isAuthenticatedUser } from "../Middlewares/auth.js";
import { processPayment } from "../Controllers/paymentController.js";
const Router = express.Router();
Router.post("/process", isAuthenticatedUser, processPayment);
export default Router;
