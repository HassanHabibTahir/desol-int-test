import { Router } from "express";
import { catchAsync } from "../middleware";
import {
 
  loginuser,

} from "../controller/auth.controller";
export const authRoutes = Router();
// login
authRoutes.post("/login", catchAsync(loginuser));


