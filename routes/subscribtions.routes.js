import express from "express";
import {getAllSubscribtions, getSingleSubscribtion, createSubscribtion, editSubscribtion, deleteSubscribtion} from "../controllers/subscribtions.controller.js"


const router = express.Router();


router.get("/", getAllSubscribtions);
router.get("/:id", getSingleSubscribtion);
router.post("/", createSubscribtion);
router.patch("/:id", editSubscribtion);
router.delete("/:id", deleteSubscribtion);

export default router;