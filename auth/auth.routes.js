import express from "express";
import AuthControllers from "./auth.controllers.js";

import verifyToken from "../middlewares/verifyToken.js";
import logoutMiddleware from "../middlewares/logoutMiddleware.js";

const router = express.Router();
const authControllers = new AuthControllers();

// Register new user route
router.post("/register", authControllers.registerController);

// User login route
router.post("/login", authControllers.loginController);

// User logout route
router.post("/profile", logoutMiddleware, authControllers.logoutController);

// User profile route
router.get("/profile", verifyToken, authControllers.userProfileController);

// Update user info route
router.put("/profile", verifyToken, authControllers.updateProfileController);

// Delete user profile route
router.delete("/profile", verifyToken, authControllers.deleteProfileController);

export default router;