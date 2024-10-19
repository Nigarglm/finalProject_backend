import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const omitPassword = (user) => {
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const signUp = async (req, res) => {
  const { email, fullName, userName, password, confirmPassword, photo, isAdmin, isSubscribed } =
    req.body;

  const responseMessage = [
    ["fullName", "Accepted"],
    ["userName", "Accepted"],
    ["password", "Accepted"],
    ["confirmPassword", "Accepted"],
    ["photo", "Accepted"],
    ["email", "Accepted"],
    ["isAdmin", "Accepted"],
    ["isSubscribed", "Accepted"]
  ];

  if (fullName.length < 3)
    responseMessage[0][1] = "Fullname should contains minimum 3 characters";
  if (userName.length < 3)
    responseMessage[1][1] = "Username should contains minimum 3 characters";
  if (password.length < 6)
    responseMessage[2][1] = "Password should contains minimum 3 characters";
  if (confirmPassword !== password)
    responseMessage[3][1] = "Passwords couldn't match";

  if (responseMessage.some(([_, msg]) => msg !== "Accepted")) {
    return res.status(400).json({ responseMessage });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("something went wrong with JWT_SECRET");
    }

    const auth = await User.findOne({ userName });
    if (auth) {
      const userNameIndex = responseMessage.findIndex(
        ([field]) => field === "userName"
      );
      if (userNameIndex !== -1) {
        responseMessage[userNameIndex][1] = "Username already in use";
      }
      return res.status(400).json({ responseMessage });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAuth = await User.create({
      email,
      photo,
      fullName,
      userName,
      password: hashedPassword,
      userName,
      isAdmin,
    });

    const token = jwt.sign({ id: newAuth._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    return res.status(201).json({
      responseMessage: "User created successfully",
      data: omitPassword(newAuth),
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ responseMessage: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("something went wrong with JWT_SECRET");
    }

    const existingUser = await User.findOne({ userName });

    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return res.status(401).send("Wrong username or password");
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    return res.status(200).send({
      message: "Logged in successfully",
      data: omitPassword(existingUser),
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ responseMessage: "Something went wrong" });
  }
};
export const logOut = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0), 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'Strict', 
      path: "/", 
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};