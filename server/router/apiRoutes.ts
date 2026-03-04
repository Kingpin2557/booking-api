import express, { Request, Response } from "express";
import path from "path";
import { getRoom, getRooms } from "../services/roomService";
import { error } from "console";
import { addMovie, getMovie, getMovies } from "../services/movieService";

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

routes.get("/room/:id", (req: Request<{ id: number }>, res: Response) => {
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

routes.put("/room/:id", (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Error in PUT route", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.get("/movies", (_req: Request, res: Response) => {
  try {
    const movies = getMovies();
    res.json(movies);
  } catch (err) {
    console.error("Failed to load movies", err);
    res.status(500).json({ error: "No movies have been loaded " });
  }
});

routes.get("/movie/:id", (req: Request<{ id: number }>, res: Response) => {
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

routes.post("/movie", (req: Request, res: Response) => {
  try {
    const data = req.body;

    addMovie(data);
    res.status(201).json({ message: "Movie toegevoegd", movie: data });
  } catch (err) {
    console.error("Error in POST route", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default routes;
