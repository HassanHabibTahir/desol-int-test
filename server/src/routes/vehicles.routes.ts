import { Router } from "express";
import { catchAsync } from "../middleware";
import { Vehicles } from "../controller/vehicles.controller";
import { authenticateUser } from "../middleware/authMiddleware";

export const vehilesRoutes = Router();
// login
vehilesRoutes.post("/",authenticateUser, catchAsync(Vehicles));


