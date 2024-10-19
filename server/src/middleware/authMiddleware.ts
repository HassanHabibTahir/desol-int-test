import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export interface AuthenticatedRequest extends Request {
  user?: any; 
}
export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; 
 
  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied." });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
 
    const user = await User.findById(decoded.userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
   
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    return res.status(401).json({ message: "Token is not valid." });
  }
};
