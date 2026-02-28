import express, { Request, Response } from "express";
import path from "path";
import { getRoom, getRooms } from "../services/roomService";
import { error } from "console";
import { getMovie, getMovies } from "../services/movieService";

const routes = express.Router();

routes.get("/", (_req: Request, res: Response) => {
  console.log("Hello World");
  res.send("Hello World");
});

routes.get("/rooms", (_req: Request, res: Response) => {
  try {
    const rooms = getRooms();
    res.json(rooms);
  } catch (err) {
    console.error("Failed to load rooms:", err);
    res.status(500).json({ error: "Failed to load rooms" });
  }
});

routes.get("/room/:id", (req, res) => {
  try {
    const { id } = req.params;

    const room = getRoom(Number(id));
    if (!room) {
      res
        .status(404)
        .json({ error: `No room has been found with an id from ${id}` });
    }

    res.json(room);
  } catch (err) {
    console.error("Failed to load room:", err);
    res.status(500).json({ error: "Failed to load room" });
  }
});

routes.get("/movies", (req, res) => {
  try {
    const movies = getMovies();
    res.json(movies);
  } catch (err) {
    console.error("Failed to load movies", err);
    res.status(500).json({ error: "No movies have been loaded " });
  }
});

routes.get("/movie/:id", (req, res) => {
  const { id } = req.params;
  try {
    const movie = getMovie(Number(id));

    if (!movie) {
      res
        .status(404)
        .json({ error: `No movie has been found with an id from ${id}` });
    }

    res.json(movie);
  } catch (err) {
    console.error(`Failed to load movie with id: ${id}`, err);
    res.status(500).json({ error: " Failed to load movie" });
  }
});

export default routes;
