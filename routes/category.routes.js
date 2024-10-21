import express from "express";
import {getAllCategories, getSingleCategory, createCategory, editCategory, deleteCategory} from "../controllers/category.controller.js"


const router = express.Router();


router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.post("/", createCategory);
router.patch("/:id", editCategory);
router.delete("/:id", deleteCategory);

export default router;