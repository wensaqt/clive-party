import type { GroundStructure } from "../board.types";
import type { GroundShape } from "../board.types";

export function buildGroundMap(grounds: GroundStructure[]) {
  const map = new Map<string, GroundStructure>();
  grounds.forEach((g) => {
    map.set(`${g.position.x}_${g.position.z}`, g);
  });
  return map;
}

export function hasGround(
  map: Map<string, GroundStructure>,
  x: number,
  z: number,
) {
  const g = map.get(`${x}_${z}`);
  return g && g.type !== "empty";
}

export function getGroundMask(
  map: Map<string, GroundStructure>,
  x: number,
  z: number,
) {
  return (
    (hasGround(map, x, z - 1) ? 1 : 0) | // N
    (hasGround(map, x + 1, z) ? 2 : 0) | // E
    (hasGround(map, x, z + 1) ? 4 : 0) | // S
    (hasGround(map, x - 1, z) ? 8 : 0) // W
  );
}

export function maskToShape(mask: number): GroundShape {
  switch (mask) {
    case 0b1111:
      return "full";
    case 0b0111:
      return "rounded-north";
    case 0b0011:
      return "rounded-corner-ne";
    default:
      return "full";
  }
}
