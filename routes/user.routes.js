import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
  editUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.put("/:id", editUser);

router.delete("/:id", deleteUser);

export default router;