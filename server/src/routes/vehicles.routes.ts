import { Router } from "express";
import { catchAsync } from "../middleware";
import { Vehicles } from "../controller/vehicles.controller";

export const vehilesRoutes = Router();
// login
vehilesRoutes.post("/", catchAsync(Vehicles));


