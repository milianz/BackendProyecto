import express from "express";
import passport from "../config/passport.js";
import {
  googleCallback,
  checkAuth,
  logout,
} from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleCallback
);

router.get("/check", authenticateJWT, checkAuth);

router.get("/logout", logout);

export default router;
