import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: [validator.isAlpha, "Name must be confined to letters A-Z"],
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Email must be a valid email address"],
  },
  password: {
    type: String,
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
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export const User = mongoose.model("User", usersSchema);
