// import express from "express"
// import { protectRoute } from "../middlewares/auth.middleware.js";
// import {getMessage, getUsersForSidebar, sendMessage} from "../controllers/message.controller.js"

// const router =express.Router();

// router.get("/users",protectRoute,getUsersForSidebar)
// router.get("/:id",protectRoute,getMessage)
// router.post("/send/:id",protectRoute,sendMessage)

// export default router;

import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessage, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/chat/:id", protectRoute, getMessage);           // ✅ Safer dynamic route
router.post("/send/:id", protectRoute, sendMessage);

export default router;