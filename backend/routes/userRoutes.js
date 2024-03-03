import express from "express";
import { getUsersController } from "../controllers/usersController.js";
import protectRoute from "../middleware/proctectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUsersController);

export default router;
