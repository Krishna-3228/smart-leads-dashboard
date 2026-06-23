import mongoose from "mongoose";
import { seedDefaultUsers } from "./seed";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("MongoDB connected");
    await seedDefaultUsers();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;