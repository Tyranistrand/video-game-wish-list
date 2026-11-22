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
    await User.create(req.body);

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
