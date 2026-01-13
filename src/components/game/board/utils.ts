import type { TileType } from "./tile/tile";

type Tile = {
  x: number;
  y: number;
  z: number;
  type: TileType;
};

export function generateBoard(width: number, depth: number): Tile[] {
  const tiles: Tile[] = [];

  for (let z = 0; z < depth; z++) {
    for (let x = 0; x < width; x++) {
      let type: TileType = "walkable";

      // Bords = obstacles
      if (x === 0 || z === 0 || x === width - 1 || z === depth - 1) {
        type = "obstacle";
      } else {
        // Obstacles internes aléatoires (mais pas trop nombreux)
        if (Math.random() < 0.15) type = "obstacle";
      }

      tiles.push({ x, y: 0, z, type });
    }
  }

  // Départ = coin supérieur gauche
  const start = tiles.find((t) => t.x === 1 && t.z === 1);
  if (start) start.type = "start";

  // Arrivée = coin inférieur droit
  const finish = tiles.find((t) => t.x === width - 2 && t.z === depth - 2);
  if (finish) finish.type = "finish";

  return tiles;
}
