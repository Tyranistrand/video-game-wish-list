import { User } from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const userExists = await User.exists({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "An account with this email already exists",
      });
    }
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    res.status(201).json({
      status: "Success",
      message: "Create successfully created",
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
  const user = await User.findOne({ email: email });
  if (!user || user.password) return;
};
