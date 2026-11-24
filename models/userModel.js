import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    validate: [validator.isEmail, "Email must be a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is requried"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      //This only works on CREATE & SAVE!!!
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords do not match",
    },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  wishlist: {
    type: Array,
    default: [],
  },
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

usersSchema.methods.comparePassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

export const User = mongoose.model("User", usersSchema);
