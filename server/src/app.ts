import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import adminRoutes from "./routes/admin.routes";
import leadRoutes from "./routes/lead.routes";

import errorHandler from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (_, res) => {
  res.json({ message: "API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leads", leadRoutes);

export default app;