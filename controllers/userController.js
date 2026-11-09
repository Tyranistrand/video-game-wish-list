import { User } from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json({
      message: "success",
      data: "LIST OF USERS...",
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err,
    });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = req.ip;
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
    ipAddress: ipAddress,
  });
  res.status(200).json({
    message: "Successfully created user",
    date: {
      email: email,
    },
  });
};
