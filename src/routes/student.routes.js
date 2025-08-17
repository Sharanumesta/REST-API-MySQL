import { Router } from "express";
import {
  addStudent,
  getStudent,
  updateStudent,
} from "../controller/students.controller.js";

const router = Router();

router.route("/add").post(addStudent);
router.route("/:usn").get(getStudent);
router.route("/update").patch(updateStudent);

export default router;
