import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "..", "data", "movies.json");

type Genre =
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "History"
  | "Horror"
  | "Music"
  | "Mystery"
  | "Romance"
  | "Sci-Fi"
  | "Thriller"
  | "War"
  | "Western";

type AgeRating = "AL" | "6+" | "12+" | "14+" | "16+" | "18+";

type Language = "English" | "Dutch" | "French" | "German" | "Spanish";

interface Movie {
  id: number;
  title: string;
  synopsis: string;
  posterUrl: string;
  runtime: number;
  ageRating: AgeRating;
  genres: Genre[];
  releaseDate: string;
  language: Language;
  hasSubtitles: boolean;
}

export const getMovies = (): Movie[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  if (!data) {
    throw new Error("No movies Found!");
  }
  return JSON.parse(data) as Movie[];
};

export const getMovie = (id: number): Movie => {
  const data = fs.readFileSync(filePath, "utf-8");
  if (!data) {
    throw new Error("No movie Found!");
  }

  const movies = JSON.parse(data) as Movie[];
  const movie = movies.find((movie) => movie.id === id);
  return movie as Movie;
};
