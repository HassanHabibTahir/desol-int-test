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
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.serverError = void 0;
const serverError = (err, _req, res, _next) => {
    if (!err.status) {
        console.error(err.stack);
    }
    res
        .status(err.status || 500)
        .json({ message: err.message || 'Internal Server Error' });
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        res.status(500).json({ message: message || 'Internal Server Error' });
    }
};
exports.serverError = serverError;
const catchAsync = (handler) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = handler(req, res, next);
        try {
            return yield result;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
                const message = Object.values(error === null || error === void 0 ? void 0 : error.errors).map((val) => val === null || val === void 0 ? void 0 : val.message);
                return res.status(422).json({
                    message: message ? message[0] : '',
                });
            }
            next(error);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.catchAsync = catchAsync;
