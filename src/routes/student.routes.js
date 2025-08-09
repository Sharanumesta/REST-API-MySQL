import { Router } from "express";
import { addStudent, getStudent } from "../controller/students.controller.js";

const router = Router();

router.route("/add").post(addStudent);
router.route("/:usn").get(getStudent);

export default router;
