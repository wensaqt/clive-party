export type TileType = "start" | "walkable" | "finish";
export type GroundType = "ground" | "empty";

export type GroundShape = "full" | "rounded-north" | "rounded-corner-ne";

export interface GroundStructure {
  type: "ground" | "empty";
  position: { x: number; y: number; z: number };
  shape?: GroundShape;
}

export type TileStructure = {
  id: string;
  position: { x: number; y: number; z: number };
  type: TileType;
  previous: string[];
  next: string[];
};

export type Board = {
  size: { width: number; depth: number };
  tiles: TileStructure[];
  grounds: GroundStructure[];
};
