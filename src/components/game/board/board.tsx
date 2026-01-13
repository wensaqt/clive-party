import { Ground } from "./ground/ground";
import type { Ground as GroundType } from "./ground/ground.interface";
import { Tile } from "./tile/tile";
import type { Tile as TileType } from "./tile/tile.interface";

export type Board = {
  size: number; // 32
  ground: GroundType[];
  tiles: TileType[];
};

interface BoardProps {
  board: Board;
}

export function Board({ board }: BoardProps) {
  const half = board.size / 2;

  return (
    <group position={[-half, 0, -half]}>
      {/* Terrain */}
      {board.ground.map((g, i) => (
        <Ground key={i} ground={g} />
      ))}

      {/* Tiles gameplay */}
      {board.tiles.map((t) => (
        <Tile key={t.id} tile={t} />
      ))}
    </group>
  );
}
