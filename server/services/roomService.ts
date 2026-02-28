import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "..", "data", "rooms.json");

export type CellType = "seat" | "VIP" | "aisle" | "wheelchair" | string;

export interface Cell {
  id: string;
  type: CellType;
  x: number;
  y: number;
}

export type Layout = Cell[][];

type Dimensions = {
  rows: number;
  cols: number;
};
interface Room {
  id: number;
  name: string;
  roomType: string;
  dimensions: Dimensions;
  layout: Layout;
}

export const getRooms = (): Room[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  if (!data) {
    throw new Error("No rooms Found!");
  }
  return JSON.parse(data) as Room[];
};

export const getRoom = (id: number): Room => {
  const data = fs.readFileSync(filePath, "utf-8");
  if (!data) {
    throw new Error("No room Found!");
  }

  const rooms = JSON.parse(data) as Room[];
  const room = rooms.find((room) => room.id === id);

  return room as Room;
};
