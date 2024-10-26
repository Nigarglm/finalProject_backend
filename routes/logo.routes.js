import express from "express";
import {getAllLogos, getSingleLogo, createLogo, editLogo, deleteLogo} from "../controllers/logo.controller.js"


const router = express.Router();


router.get("/", getAllLogos);
router.get("/:id", getSingleLogo);
router.post("/", createLogo);
router.patch("/:id", editLogo);
router.delete("/:id", deleteLogo);

export default router;