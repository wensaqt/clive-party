import { create } from "zustand";
import type { Board } from "../modules/board/board.types";
import type { PlayerStructure } from "../modules/player/player.types";
import { SAVED_BOARD_1 } from "./saved-boards/SAVED_BOARD_1";

interface GameState {
  currentBoard: Board | null;
  players: PlayerStructure[];

  setBoard: (board: Board) => void;
  setPlayers: (players: PlayerStructure[]) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentBoard: SAVED_BOARD_1,
  // mocked players for now
  players: [
    {
      id: "p1",
      nickname: "Alice",
      tileId: "13-4",
    },
    {
      id: "p2",
      nickname: "Bob",
      tileId: "4-2",
    },
    {
      id: "p3",
      nickname: "Chiottelope",
      tileId: "4-2",
    },
  ],

  setBoard: (board) =>
    set({
      currentBoard: board,
    }),

  setPlayers: (players) =>
    set({
      players,
    }),

  resetGame: () =>
    set({
      currentBoard: null,
      players: [],
    }),
}));
