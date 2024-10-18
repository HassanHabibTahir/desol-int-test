"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehilesRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const vehicles_controller_1 = require("../controller/vehicles.controller");
exports.vehilesRoutes = (0, express_1.Router)();
// login
exports.vehilesRoutes.post("/", (0, middleware_1.catchAsync)(vehicles_controller_1.Vehicles));
