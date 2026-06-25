import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import adminRoutes from "./routes/admin.routes";
import leadRoutes from "./routes/lead.routes";
import uploadRoutes from "./routes/upload.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);


export default app;