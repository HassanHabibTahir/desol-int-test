import mongoose from "mongoose";

// const url = process.env.MONGO_URI as string;
const url ="mongodb+srv://nftthee:nftthee@cluster0.hov9i7k.mongodb.net/"
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
