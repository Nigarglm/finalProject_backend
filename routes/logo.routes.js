import express from "express";
import {getLogo, createLogo, editLogo, deleteLogo} from "../controllers/logo.controller.js"


const router = express.Router();


router.get("/", getLogo);
router.post("/", createLogo);
router.patch("/:id", editLogo);
router.delete("/:id", deleteLogo);

export default router;