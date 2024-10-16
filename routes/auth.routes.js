import express from "express";
import { signIn, signUp, logOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/logOut", logOut);


export default router;
