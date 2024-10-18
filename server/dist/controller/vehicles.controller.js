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
exports.Vehicles = void 0;
const vehicle_1 = __importDefault(require("../models/vehicle"));
const Vehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const { carModel, price, phoneNumber, maxPictures, city } = req.body;
            // Ensure files are uploaded
            if (!req.files || !req.files.pictures) {
                return res.status(400).send({ message: 'No files were uploaded.' });
            }
            const uploadedFiles = req.files.pictures; // Could be multiple or a single file
            // Ensure uploadedFiles is an array
            let filesArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
            // Validate the number of files uploaded
            if (filesArray.length !== parseInt(maxPictures)) {
                return res.status(400).send({ message: `Please upload exactly ${maxPictures} pictures.` });
            }
            // Convert uploaded files to buffers
            const pictures = filesArray.map(file => file.data); // `data` contains the buffer
            // Create a new document
            const vehicleImage = new vehicle_1.default({
                carModel,
                price,
                phoneNumber,
                maxPictures,
                city,
                pictures, // Store image buffers in MongoDB
            });
            // Save to the database
            yield vehicleImage.save();
            res.status(200).json({ message: 'Images uploaded successfully!', vehicleImage });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to upload images.', error });
        }
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in." });
    }
});
exports.Vehicles = Vehicles;
