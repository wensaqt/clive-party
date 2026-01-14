import type { TileStructure } from "../board.types";
import { Tile } from "./Tile";

interface TileRendererProps {
  tiles: TileStructure[];
}

export function TileRenderer({ tiles }: TileRendererProps) {
  return tiles.map((t) => <Tile key={t.id} tile={t} />);
}
