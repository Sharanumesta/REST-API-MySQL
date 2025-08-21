import db from "../db/connection.db.js";

const addStudent = async (req, res) => {
  try {
    const { usn, name, branch, cgpa, phone } = req.body;
    if (!usn || !name || !branch || cgpa === undefined || phone === undefined)
      return res.status(400).json({ message: "All field are required" });

    const [studentExist] = await db.query(
      "SELECT usn FROM student WHERE usn = ?",
      [usn]
    );
    if (studentExist.length > 0)
      return res.status(409).json({ message: "Student already exist" });

    await db.query(
      "INSERT INTO student(usn, name, branch,cgpa, phone) VALUES(?,?,?,?,?)",
      [usn, name, branch, cgpa, phone]
    );

    return res.status(201).json({ message: "data saved successfully" });
  } catch (error) {
    console.error("Error in /student/add", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const { usn } = req.params;
    if (!usn)
      return res
        .status(400)
        .json({ message: "Invalid Parameter, usn is empty" });

    const [getQuery] = await db.query("select * from student where usn = ?", [
      usn,
    ]);
    if (getQuery.length === 0)
      return res.status(404).json({ message: "Student not found" });
    return res
      .status(200)
      .json({ message: "Student found successfully", student: getQuery[0] });
  } catch (error) {
    console.error("Error while fetching the data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { usn, name, branch, cgpa, phone } = req.body;
    if (!usn || !name || !branch || cgpa === undefined || phone === undefined)
      return res.status(400).json({ message: "All field are required" });

    const [studentExist] = await db.query(
      "SELECT usn FROM student WHERE usn = ?",
      [usn]
    );
    if (studentExist.length === 0)
      return res.status(409).json({ message: "Student does not exist" });

    const [result] = await db.query(
      "UPDATE student SET name = ?, branch = ?, cgpa = ?, phone = ? WHERE usn = ?",
      [name, branch, cgpa, phone, usn]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Update failed" });
    }

    return res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error while updating the data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let { usn } = req.params;
    if (!usn) return res.status(400).json({ message: "USN cannot be empty" });
    const [row] = await db.query("SELECT usn FROM student WHERE usn = ?", [
      usn,
    ]);
    if (!row.length)
      return res.status(404).json({ message: "Student doesn't exist" });
    await db.query("DELETE FROM student WHERE usn = ?", [usn]);
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error while deleting the data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addStudent, getStudent, updateStudent, deleteStudent };
