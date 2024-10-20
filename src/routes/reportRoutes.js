import express from "express";
import { reportPublication } from "../controllers/reportController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/:publicationId", authenticateJWT, reportPublication);

export default router;
