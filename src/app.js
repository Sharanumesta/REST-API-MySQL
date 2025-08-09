import express from "express";

const app = express();
app.use(express.json());

import router from "./routes/student.routes.js";
app.use("/api/v1/student", router);

export default app;