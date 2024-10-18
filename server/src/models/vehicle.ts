import mongoose, { Document, Schema } from 'mongoose';

interface IVehicle extends Document {
  carModel: string;
  price: number;
  phoneNumber: string;
  maxPictures: number;
  city: string;
  pictures: Buffer[];
  createdAt: Date;
}

const VehicleSchema: Schema = new Schema({
  carModel: { type: String, required: true },
  price: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  maxPictures: { type: Number, required: true },
  city: { type: String, required: true },
  pictures: { type: [Buffer], required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const VehicleModel = mongoose.model<IVehicle>('Vehicles', VehicleSchema);

export default VehicleModel;
