import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  loggedInUserOrders,
  updateOrder,
} from "../Controllers/orderController.js";
import { auhtorizeRoles, isAuthenticatedUser } from "../Middlewares/auth.js";
const Router = express.Router();
Router.get(
  "/admin/allOrders",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  getAllOrders
);
Router.delete(
  "/admin/deleteOrder/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  deleteOrder
);
Router.put(
  "/admin/updateOrder/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  updateOrder
);
Router.post("/create", isAuthenticatedUser, createOrder);
Router.get("/single/:id", isAuthenticatedUser, getSingleOrder);
Router.get("/admin/orderDetails/:id", isAuthenticatedUser, getSingleOrder);
Router.get("/me", isAuthenticatedUser, loggedInUserOrders);

export default Router;
