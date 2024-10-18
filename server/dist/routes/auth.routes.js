"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const auth_controller_1 = require("../controller/auth.controller");
exports.authRoutes = (0, express_1.Router)();
// login
exports.authRoutes.post("/login", (0, middleware_1.catchAsync)(auth_controller_1.loginuser));
