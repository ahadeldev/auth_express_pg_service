import express from "express";
import dotenv from "dotenv";

import authRoutes from "./auth/auth.routes.js";
import logger from "./middlewares/logger.js";
import routeNotFound from "./middlewares/notFound.js";
import appErrorHandler from "./middlewares/appErrorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(logger);

// Authentication routes service
app.use("/api/v1", authRoutes);

// Route not found middleware
app.use(routeNotFound);

// Global API error handling middleware
app.use(appErrorHandler);

app.listen(PORT, () => {
  console.log(`==> Server started on port: ${PORT}`);
})