import { useMemo } from "react";
import { useGameStore } from "../../../store/gameStore";
import { positionPlayersOnTile } from "../player.utils";

export function usePlayerController() {
  const { currentBoard, players } = useGameStore();

  const playersWithPosition = useMemo(() => {
    if (!currentBoard) return [];
    return positionPlayersOnTile(players, currentBoard.tiles);
  }, [players, currentBoard]);

  const setPlayerPosition = (playerId: string, tileId: string) => {
    useGameStore.setState((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, tileId } : p,
      ),
    }));
  };

  const createPlayer = (nickname?: string) => {
    if (!currentBoard) return;
    useGameStore.setState((state) => {
      const newId = `p${state.players.length + 1}`;
      return {
        players: [
          ...state.players,
          {
            id: newId,
            nickname: nickname || `Player ${state.players.length + 1}`,
            tileId: currentBoard.tiles[0].id,
          },
        ],
      };
    });
  };

  return { players: playersWithPosition, setPlayerPosition, createPlayer };
}
