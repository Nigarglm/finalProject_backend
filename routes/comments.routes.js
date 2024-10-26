import express from "express";
import {getAllComments, getSingleComment, createComment, editComment, deleteComment} from "../controllers/comments.controller.js"


const router = express.Router();


router.get("/", getAllComments);
router.get("/:id", getSingleComment);
router.post("/", createComment);
router.patch("/:id", editComment);
router.delete("/:id", deleteComment);

export default router;