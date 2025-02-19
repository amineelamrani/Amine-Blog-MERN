const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    profilePicture: {
      type: String,
      default:
        "https://img.icons8.com/?size=100&id=Ib9FADThtmSf&format=png&color=000000",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    likedArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
  },
  { timestamps: true }
);

// pre function before saving to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // when creating a new password or modifying it we will hash it before save
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
