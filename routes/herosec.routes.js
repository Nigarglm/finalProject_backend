import express from "express";
import {getAllHeroes, getSingleHero, createHero, editHero, deleteHero} from "../controllers/herosec.controller.js"


const router = express.Router();


router.get("/", getAllHeroes);
router.get("/:id", getSingleHero);
router.post("/", createHero);
router.patch("/:id", editHero);
router.delete("/:id", deleteHero);

export default router;