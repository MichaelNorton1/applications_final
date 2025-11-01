import { Router } from "express";
import { getHome } from "../controllers/homeController.js";
import { statController } from "../controllers/statController.js";
const router = Router();
router.get("/", getHome);
router.get("/nfl", statController);
export default router;
