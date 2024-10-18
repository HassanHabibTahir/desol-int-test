import mongoose from "mongoose";

const url = process.env.MONGO_URI as string;

export function connectDB(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false);
    mongoose
      .connect(url)
      .then(() => {
        console.log("DATABASE IS CONNECTED :)");
        resolve();
      })
      .catch(reject);
  });
}
