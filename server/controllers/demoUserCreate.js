import User from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    const err = new Error("Please enter name, email, password");
    return next(err);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    const err = new Error("Please enter valid email ID");
    return next(err);
  }

  if (password.length < 8) {
    res.status(400);
    const err = new Error("Password must be 8 Characters or more");
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
      res.send("User Created Successfully!!");
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
