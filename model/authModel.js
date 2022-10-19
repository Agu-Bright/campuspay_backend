const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Field is required"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "This user already exists"],
    validate: [validator.isEmail, "Please Enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password field is required"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  campus: {
    type: String,
    required: [true, "Please provide the name of your campus"],
  },
  courseOfStudy: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  bank: String,
  accountName: String,
  accountNumber: String,
  requested: {
    type: Boolean,
    default: false,
  },
  phoneNumber: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encrypting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = new mongoose.model("User", userSchema);
