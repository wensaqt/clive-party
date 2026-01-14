import type { TileStructure } from "../board/board.types";
import type { PlayerStructure } from "./player.types";

/**
 * Groupe les joueurs par tileId
 */
export function groupPlayersByTile(players: PlayerStructure[]) {
  return players.reduce<Record<string, PlayerStructure[]>>((acc, player) => {
    if (!acc[player.tileId]) acc[player.tileId] = [];
    acc[player.tileId].push(player);
    return acc;
  }, {});
}

/**
 * Calcule un offset organique pour un joueur sur une tile
 */
export function calculatePlayerOffset(
  index: number,
  total: number,
  offsetAmount = 0.25,
  randomness = 0.1,
): [number, number] {
  if (total <= 1) return [0, 0]; // joueur seul → centré

  const angle = (index / total) * Math.PI * 2;
  let offsetX = Math.cos(angle) * offsetAmount;
  let offsetZ = Math.sin(angle) * offsetAmount;

  // Variation organique
  offsetX += (Math.random() - 0.5) * randomness;
  offsetZ += (Math.random() - 0.5) * randomness;

  return [offsetX, offsetZ];
}

/**
 * Renvoie la position finale d’un joueur sur sa tile
 */
export function getPlayerOffsetOnTile(
  player: PlayerStructure,
  tile: TileStructure,
  tilePlayers: PlayerStructure[],
): [number, number, number] {
  const index = tilePlayers.findIndex((p) => p.id === player.id);
  const [offsetX, offsetZ] = calculatePlayerOffset(index, tilePlayers.length);
  return [
    tile.position.x + offsetX,
    tile.position.y + 0.6,
    tile.position.z + offsetZ,
  ];
}

export function positionPlayersOnTile(
  players: PlayerStructure[],
  tiles: TileStructure[],
): (PlayerStructure & { position?: [number, number, number] })[] {
  const playersByTile = groupPlayersByTile(players);

  return players.map((player) => {
    const tile = tiles.find((t) => t.id === player.tileId);
    if (!tile) return { ...player, position: undefined };

    const tilePlayers = playersByTile[player.tileId];
    const position = getPlayerOffsetOnTile(player, tile, tilePlayers);

    return { ...player, position };
  });
}
