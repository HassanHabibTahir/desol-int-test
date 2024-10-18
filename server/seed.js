require("dotenv").config();
const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema(
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
      required: [true, "Please enter your email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Create the User model
const User = mongoose.model("User", userSchema);

const user = {
  firstName: "John",
  lastName: "Doe",
  email: "Amjad@desolint.com", 
  password: "123456abc", 
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected with MongoDB for Seeding."))
  .catch((err) => console.log(`Unable to connect with MongoDB: ${err.message}`));

// Function to save the user
const saveUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log(`User with email ${user.email} already exists. No new user created.`);
        return resolve(); // If user exists, return early
      }

      // Create and save the new user
      await User.create(user);
      console.log("User uploaded successfully:", user.email);
      resolve();
    } catch (error) {
      console.error("Error uploading user:", error.message);
      reject(error);
    }
  });

(async () => {
  await saveUser();
  console.log("Seeding completed. Disconnected.");
  mongoose.disconnect();
})();
