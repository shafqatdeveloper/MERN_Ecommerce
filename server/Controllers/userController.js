import User from "../Models/userModel.js";
import formidable from "formidable";
import cloudinary from "cloudinary";
import sendEmail from "../Config/sendEmail.js";
import crypto from "crypto";

// Register a User
export const registerUser = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        throw new Error("Error while parsing");
      }
      const { name, email, password, avatar } = fields;
      let myCloud = null;
      if (avatar) {
        myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(404).json({
          success: false,
          message: "User Already Exist",
        });
      } else {
        const user = await User.create({
          name,
          email,
          password,
          avatar: myCloud
            ? {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              }
            : {
                public_id: "public_id",
                url: "url",
              },
        });
        const token = user.getJWTToken();
        res
          .status(200)
          .cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          })
          .json({
            success: true,
            user,
          });
      }
    });
  } catch (error) {
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// Login a User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Both Email and Password are complursory",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(502).json({
          success: false,
          message: "Invalid Email or Password",
        });
      } else {
        const isPasswordMatched = await user.comparePassword(password);
        console.log(isPasswordMatched);
        if (!isPasswordMatched) {
          res.status(503).json({
            success: false,
            message: "Invalid Password",
          });
        } else {
          const token = user.getJWTToken();
          res
            .status(200)
            .cookie("token", token, {
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            })
            .json({
              success: true,
              message: "Logged In",
              user,
              token,
            });
        }
      }
    }
  } catch (error) {
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not Found",
    });
  } else {
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `http://localhost:5173/user/password/reset/${resetToken}`;
    const message = `Your Reset Password URL is :- \n\n ${resetPasswordUrl}.\n\n If you have Not requested this please ignore this email`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Ecomm",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// Reset Password

export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gte: Date.now() },
    });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Token is either expired or Invalid",
      });
    } else {
      if (req.body.password !== req.body.confirmPassword) {
        res.status(403).json({
          success: false,
          message: "New Password and Confirm Password must be same",
        });
      } else {
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        const token = user.getJWTToken();
        res
          .status(200)
          .cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          })
          .json({
            success: true,
            message: "Password Reset Successfully",
            user,
          });
      }
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User

export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile of a User

export const updateUser = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("Error at line 97 of userController ");
        throw new Error("Error while parsing form Data");
      } else {
        const { name, email, avatar } = fields;
        let myCloud = null;
        if (avatar) {
          const user = await User.findById(req.user._id);
          const oldPic = user.avatar.public_id;
          console.log(oldPic);
          await cloudinary.v2.uploader.destroy(oldPic);
          myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
        }
        const newUserData = {
          name,
          email,
          avatar: myCloud
            ? {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              }
            : {
                public_id: "publicid",
                url: "url",
              },
        };
        const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
          runValidators: true,
          new: true,
        });
        res.status(200).json({
          success: true,
          message: "Profile Updated",
          user,
        });
      }
    });
  } catch (error) {
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Password

export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword) {
    res.status(504).json({
      success: false,
      message: "Enter Old Password",
    });
  } else {
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      res.status(504).json({
        success: false,
        message: "Old Password is wrong",
      });
    } else {
      if (!newPassword || !confirmPassword) {
        res.status(504).json({
          success: false,
          message: "Please Enter New Password and Confirm Password",
        });
      } else {
        if (newPassword !== confirmPassword) {
          res.status(504).json({
            success: false,
            message: "New Password and Confirm Password not Matched",
          });
        } else {
          user.password = newPassword;
          await user.save();
          res.status(200).json({
            success: true,
            message: "Password Updated",
          });
        }
      }
    }
  }
  try {
  } catch (error) {
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User Role

export const updateRole = async (req, res) => {
  try {
    const { newRole } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: newRole },
      {
        runValidators: false,
      }
    );
    res.status(200).json({
      success: true,
      message: "User role Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Registered Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Details of A Single User --Admin

export const singleUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({
        success: false,
        message: `User not found with this ID ${req.params.id}`,
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Deatils

export const getDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User --Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await User.deleteOne(user);
    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
