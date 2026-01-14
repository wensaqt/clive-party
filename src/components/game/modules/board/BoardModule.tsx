import { useGameStore } from "../../store/gameStore";

import { GroundRenderer } from "./ground/GroundRenderer";

import { TileRenderer } from "./tile/TileRenderer";

export function BoardModule() {
  const { currentBoard } = useGameStore();

  return (
    <group>
      <GroundRenderer grounds={currentBoard!.grounds} />
      <TileRenderer tiles={currentBoard!.tiles} />
    </group>
  );
}
