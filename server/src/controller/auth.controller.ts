import { Request, Response } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET=process.env.JWT_SECRET as string;
// const JWT_SECRET ="45678909876567890987656789"
export const loginuser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign({ userId: user._id },JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful!",
      token,
      user
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in." });
  }

};

