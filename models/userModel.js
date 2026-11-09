import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Email must be a valid email address"],
  },
  password: String,
  createdOn: { type: Date, default: Date.now },
  ipAddress: String,
});

usersSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

export const User = mongoose.model("User", usersSchema);
