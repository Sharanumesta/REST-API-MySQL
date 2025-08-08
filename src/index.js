import { configDotenv } from "dotenv";
configDotenv();
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello sharanu");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
