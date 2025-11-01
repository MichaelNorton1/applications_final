import { Router } from "express";
import { getHome } from "../controllers/homeController.js";
import {statController} from "../controllers/statController.js";
import {getPgVersion} from "../controllers/addToDB.js";
import {analyzeData} from "../controllers/analyzeData.js";

const router = Router();

router.get("/", getHome);

router.get("/nfl", statController);

router.get("/db", getPgVersion);

router.get("/analyze", analyzeData);

export default router;
