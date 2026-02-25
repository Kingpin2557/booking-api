import express, { Request, Response } from "express";
import path from "path";

const routes = express.Router();

routes.get("/", (_req: Request, res: Response) => {
  console.log("Hello World");
  res.send("Hello World");
});

export default routes;
