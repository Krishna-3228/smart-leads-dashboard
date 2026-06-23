import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const seedDefaultUsers = async () => {
  try {
    // Check and seed Admin User
    const hashedPasswordAdmin = await bcrypt.hash("password123", 10);
    const adminExists = await User.findOne({ email: "admin@test.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@test.com",
        password: hashedPasswordAdmin,
        role: "admin",
      });
      console.log("Default admin user (admin@test.com) seeded successfully.");
    } else {
      adminExists.password = hashedPasswordAdmin;
      adminExists.role = "admin";
      await adminExists.save();
      console.log("Default admin user (admin@test.com) credentials synchronized.");
    }

    // Check and seed Naira (Sales) User
    const hashedPasswordNaira = await bcrypt.hash("password123", 10);
    const nairaExists = await User.findOne({ email: "naira@test.com" });
    if (!nairaExists) {
      await User.create({
        name: "Naira",
        email: "naira@test.com",
        password: hashedPasswordNaira,
        role: "sales",
      });
      console.log("Default sales user (naira@test.com) seeded successfully.");
    } else {
      nairaExists.password = hashedPasswordNaira;
      nairaExists.role = "sales";
      await nairaExists.save();
      console.log("Default sales user (naira@test.com) credentials synchronized.");
    }
  } catch (error) {
    console.error("Error seeding/synchronizing default users:", error);
  }
};
