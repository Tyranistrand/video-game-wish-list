import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const userExists = await User.exists({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "An account with this email already exists",
      });
    }
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.status(201).json({
      status: "Success",
      token: token,
      expires_in: token.expiresIn,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failure",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Failure",
      message: "Please provide an email and password",
    });
  }
  const requestedUser = await User.findOne({ email: email }).select(
    "+password",
  );

  if (!requestedUser || !(await requestedUser.comparePassword(password))) {
    return res.status(401).json({
      status: "Failure",
      message: "Email or password incorrect",
    });
  }

  const token = jwt.sign({ id: requestedUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.status(200).json({
    status: "Success",
    token,
  });
};
