import { Router } from "express";
import {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent
} from "../controller/students.controller.js";

const router = Router();

router.route("/add").post(addStudent);
router.route("/get/:usn").get(getStudent);
router.route("/update").put(updateStudent);
router.route("/delete/:usn").delete(deleteStudent);

export default router;
