import express from "express";
import { getMessageController, sendMessageController } from "../controllers/messageController.js";
import proctectRoute from "../middleware/proctectRoute.js";

const router = express.Router();

router.get("/:id", proctectRoute, getMessageController);
router.post("/send/:id", proctectRoute, sendMessageController);

export default router;
