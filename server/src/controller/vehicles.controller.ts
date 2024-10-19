import { Request, Response } from "express";
import VehicleModel from "../models/vehicle";
import fileUpload, { UploadedFile } from 'express-fileupload';

export const Vehicles = async (req: any, res: Response): Promise<any> => {
  try {
    try {
      const userId = req.user?.id;
    
        const { carModel, price, phoneNumber, maxPictures, city } = req.body;
    
        if (!req.files || !req.files.pictures) {
          return res.status(400).send({ message: 'No files were uploaded.' });
        }
    
        const uploadedFiles = req.files.pictures as UploadedFile[] | UploadedFile; // Could be multiple or a single file
    
        // Ensure uploadedFiles is an array
        let filesArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    
        // Validate the number of files uploaded
        if (filesArray.length !== parseInt(maxPictures)) {
          return res.status(400).send({ message: `Please upload exactly ${maxPictures} pictures.` });
        }
    
        // Convert uploaded files to buffers
        const pictures = filesArray.map(file => file.data); // `data` contains the buffer
    
        // Create a new document
        const vehicleImage = new VehicleModel({
          carModel,
          price,
          phoneNumber,
          maxPictures,
          city,
          pictures,
          user: userId, 
        });
    
        // Save to the database
        await vehicleImage.save();
    
        res.status(200).json({ message: 'Images uploaded successfully!', vehicleImage });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to upload images.', error });
      }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in." });
  }

};

