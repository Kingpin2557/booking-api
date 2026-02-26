import express, { Application, Request, Response } from "express";
import routes from "./routes";
import path from "path";

const app: Application = express();
const PORT: number = 3000;

app.use(express.static(path.join(__dirname, "./public")));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
