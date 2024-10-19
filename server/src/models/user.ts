import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    
    firstName: {
      type: String,
      required: false, 
    },
    lastName: {
      type: String,
      required: false, 
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password!"], 
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err:any) {
    return next(err);
  }
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword:any) {
  return await bcrypt.compare(candidatePassword, this.password);
};
export const User = model("User", userSchema);
