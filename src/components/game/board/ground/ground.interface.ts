export type GroundType = "ground" | "empty";

export interface Ground {
  position: { x: number; y: number; z: number };
  type: GroundType;
}
