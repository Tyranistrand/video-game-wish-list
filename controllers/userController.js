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

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "Failure",
        message: "User with the entered ID does not exist",
      });
    }
    res.status(200).json({
      status: "Success",
      message: user,
    });
  } catch (error) {
    console.log(err);
  }
};
