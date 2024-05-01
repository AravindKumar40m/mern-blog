import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400);
    res.json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).json("signup successfully");
  } catch (err) {
    res.status(400);
    res.json(err.errmsg);
  }
};

export { signup };
