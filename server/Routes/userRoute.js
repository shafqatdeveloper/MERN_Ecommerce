import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getDetails,
  login,
  logoutUser,
  registerUser,
  resetPassword,
  singleUserDetails,
  updatePassword,
  updateRole,
  updateUser,
} from "../Controllers/userController.js";
import { auhtorizeRoles, isAuthenticatedUser } from "../Middlewares/auth.js";
const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", login);
Router.put("/update", isAuthenticatedUser, updateUser);
Router.put("/password/update", isAuthenticatedUser, updatePassword);
Router.get("/logout", isAuthenticatedUser, logoutUser);
Router.put(
  "/admin/update/role/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  updateRole
);
Router.get(
  "/admin/all",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  getAllUsers
);
Router.delete(
  "/admin/deleteUser/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  deleteUser
);
Router.get(
  "/admin/single/details/:id",
  isAuthenticatedUser,
  auhtorizeRoles("admin"),
  singleUserDetails
);
Router.post("/password/forgot", forgotPassword);
Router.put("/password/reset/:token", resetPassword);
Router.get("/details", isAuthenticatedUser, getDetails);
export default Router;
