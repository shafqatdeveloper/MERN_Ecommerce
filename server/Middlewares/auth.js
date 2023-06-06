import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(502).json({
      suucess: false,
      message: "Please Login First",
    });
  } else {
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    const decoded = jwt.decode(token, { complete: true });
    next();
  }
};

export const auhtorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(404).json({
        success: false,
        message: "Not Authorized",
      });
    } else {
      next();
    }
  };
};
