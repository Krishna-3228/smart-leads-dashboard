import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "sales";
  imageUrl?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "sales"],
      default: "sales",
    },

    imageUrl: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);