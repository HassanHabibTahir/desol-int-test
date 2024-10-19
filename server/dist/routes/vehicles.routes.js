"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehilesRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const vehicles_controller_1 = require("../controller/vehicles.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.vehilesRoutes = (0, express_1.Router)();
// login
exports.vehilesRoutes.post("/", authMiddleware_1.authenticateUser, (0, middleware_1.catchAsync)(vehicles_controller_1.Vehicles));
