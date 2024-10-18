"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_timeout_1 = __importDefault(require("connect-timeout"));
const middleware_1 = require("./middleware");
const auth_routes_1 = require("./routes/auth.routes");
const conn_1 = require("./utils/conn");
const vehicles_routes_1 = require("./routes/vehicles.routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, connect_timeout_1.default)('60000s'));
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conn_1.connectDB)();
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
app.use('/api/auth', auth_routes_1.authRoutes);
app.use('/api/vehicles', vehicles_routes_1.vehilesRoutes);
app.get('/', (req, res) => {
    res.send('Express Server');
});
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
app.use(middleware_1.serverError);
