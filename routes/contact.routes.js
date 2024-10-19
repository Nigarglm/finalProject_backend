import express from "express";
import {getAllContacts,getSingleContact,createContact,editContact,deleteContact} from "../controllers/contact.controller.js"


const router = express.Router();


router.get("/", getAllContacts);
router.get("/:id", getSingleContact);
router.post("/", createContact);
router.patch("/:id", editContact);
router.delete("/:id", deleteContact);

export default router;