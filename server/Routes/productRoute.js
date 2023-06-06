import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getAllReviews,
  productDetails,
  updateProduct,
} from "../Controllers/productController.js";
import { auhtorizeRoles, isAuthenticatedUser } from "../Middlewares/auth.js";

const Router = express.Router();

Router.post(
  "/admin/create",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  createProduct
);
Router.put(
  "/admin/update/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  updateProduct
);
Router.delete(
  "/admin/delete/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  deleteProduct
);
Router.get(
  "/admin/allProducts",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  getAdminProducts
);
Router.get("/all", getAllProducts);
Router.get("/details/:id", productDetails);
Router.post("/create/review", isAuthenticatedUser, createReview);
Router.delete("delete/review", isAuthenticatedUser, deleteReview);
Router.get("/reviews/:id", getAllReviews);

export default Router;
