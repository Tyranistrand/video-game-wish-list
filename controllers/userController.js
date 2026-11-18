import { User } from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "error",
      error: err,
    });
  }
};

export const createAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.exists({ email: email });

    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "An account with this email already exists",
      });
    }
    await User.create({
      email: email,
      password: password,
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
