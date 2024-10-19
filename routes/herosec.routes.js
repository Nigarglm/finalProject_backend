import express from "express";
import {getHero, createHero, editHero, deleteHero} from "../controllers/herosec.controller.js"


const router = express.Router();


router.get("/", getHero);
router.post("/", createHero);
router.patch("/:id", editHero);
router.delete("/:id", deleteHero);

export default router;