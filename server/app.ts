import express, { Application } from "express";
import apiRoutes from "./router/apiRoutes";
import path from "path";

const app: Application = express();
const PORT: number = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

express.urlencoded({ extended: true });
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
