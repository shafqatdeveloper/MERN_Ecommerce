import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Must be 5 character or More"],
    minLength: [5, "Name must be 5 character long"],
    maxLength: [25, "Name must be less than 25 character"],
  },
  email: {
    type: String,
    required: [true, "Must be a Valid E-Mail"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password be Provided"],
    minLength: [8, "Password must be 8 character long"],
    maxLength: [25, "Password must be less than 25 character"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hashing Passwor Everytime but Only when user changes Password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Generating a Token while user is logging In

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Comparing Password for Login and Updating User

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a Token for Password Reset

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(10).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 45 * 60 * 1000;
  return resetToken;
};

const USER = mongoose.model("user", userSchema);
export default USER;
