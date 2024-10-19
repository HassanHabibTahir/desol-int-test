"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// const url = process.env.MONGO_URI as string;
const url = "mongodb+srv://nftthee:nftthee@cluster0.hov9i7k.mongodb.net/";
function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.set("bufferCommands", false);
        mongoose_1.default
            .connect(url)
            .then(() => {
            console.log("DATABASE IS CONNECTED :)");
            resolve();
        })
            .catch(reject);
    });
}
exports.connectDB = connectDB;
