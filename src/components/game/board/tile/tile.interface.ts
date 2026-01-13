export type TileType = "start" | "walkable" | "finish";

export interface Tile {
  id: string;
  position: { x: number; y: number; z: number };
  type: TileType;
  next: string[];
  previous: string[];
}
