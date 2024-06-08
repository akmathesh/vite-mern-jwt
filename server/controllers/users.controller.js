import User from "../models/user.model.js";

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.status(400);
    const err = new Error("Please provide name, email and password");
    return next(err);
  }

  if (password.length < 8) {
    res.status(400);
    const err = new Error("Password must be atleast 8 charecters");
    return next(err);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    const err = new Error("Invalid Email Address!!");
    return next(err);
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      const err = new Error(
        "This Email is already exist!!.. Please enter another Email ID"
      );
      return next(err);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.send("User created");
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ Error: error.message } || "Internal Server Error");
  }
};

const login = async (req, res) => {};
const logout = async (req, res) => {};
const getProfile = async (req, res) => {};
const updateProfile = async (req, res) => {};

export { createUser, login, logout, getProfile, updateProfile };
