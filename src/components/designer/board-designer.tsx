// src/designer/BoardDesigner.tsx
import { useEffect, useState } from "react";

const GRID_SIZE = 32;
const RANGE = 4;

type Mode = "terrain" | "trace";
type GroundType = "ground" | "empty";
type TileType = "start" | "walkable" | "finish";

interface GroundCell {
  position: { x: number; y: number; z: number };
  type: GroundType;
}

interface DesignerTile {
  id: string;
  position: { x: number; y: number; z: number };
  type: TileType;
  next: string[];
  previous: string[];
}

export function BoardDesigner() {
  const [mode, setMode] = useState<Mode>("terrain");
  const [showJson, setShowJson] = useState(false);

  // --- Terrain ---
  const [ground, setGround] = useState<GroundCell[]>(() =>
    Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => ({
      position: {
        x: i % GRID_SIZE,
        y: 0,
        z: Math.floor(i / GRID_SIZE),
      },
      type: "empty",
    })),
  );

  const [brushSize, setBrushSize] = useState(6);

  // --- Tracé ---
  const [tiles, setTiles] = useState<DesignerTile[]>([]);
  const [placingType, setPlacingType] = useState<TileType>("start");
  const [lastTileId, setLastTileId] = useState<string | null>(null);

  const id = (x: number, z: number) => `${x}-${z}`;

  // --- Click cellule ---
  const handleClickCell = (x: number, z: number) => {
    const cellId = id(x, z);

    if (mode === "terrain") {
      const half = Math.floor(brushSize / 2);

      setGround((prev) =>
        prev.map((cell) => {
          const dx = Math.abs(cell.position.x - x);
          const dz = Math.abs(cell.position.z - z);

          if (dx <= half && dz <= half) {
            return { ...cell, type: "ground" };
          }
          return cell;
        }),
      );
      return;
    }

    // --- MODE TRACE ---
    const groundCell = ground.find(
      (c) => c.position.x === x && c.position.z === z,
    );
    if (!groundCell || groundCell.type !== "ground") return;

    if (tiles.some((t) => t.id === cellId)) return;

    if (tiles.length === 0 && placingType !== "start") return;

    if (lastTileId) {
      const last = tiles.find((t) => t.id === lastTileId)!;
      const dx = Math.abs(last.position.x - x);
      const dz = Math.abs(last.position.z - z);
      if (dx + dz > RANGE) return;
    }

    const newTile: DesignerTile = {
      id: cellId,
      position: { x, y: 0.1, z },
      type: placingType,
      next: [],
      previous: lastTileId ? [lastTileId] : [],
    };

    setTiles((prev) =>
      prev
        .map((t) =>
          t.id === lastTileId ? { ...t, next: [...t.next, cellId] } : t,
        )
        .concat(newTile),
    );

    setLastTileId(cellId);
    if (placingType === "start") setPlacingType("walkable");
  };

  // --- Undo ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        if (tiles.length === 0) return;
        e.preventDefault();

        const removed = tiles[tiles.length - 1];
        const remaining = tiles.slice(0, -1);

        setTiles(
          remaining.map((t) =>
            t.id === removed.previous[0]
              ? { ...t, next: t.next.filter((n) => n !== removed.id) }
              : t,
          ),
        );

        setLastTileId(
          remaining.length ? remaining[remaining.length - 1].id : null,
        );

        if (remaining.length === 0) setPlacingType("start");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tiles]);

  // --- Couleurs ---
  const getCellColor = (x: number, z: number) => {
    const tile = tiles.find((t) => t.position.x === x && t.position.z === z);
    if (tile) {
      if (tile.type === "start") return "green";
      if (tile.type === "finish") return "red";
      return "#bbb";
    }

    const groundCell = ground.find(
      (c) => c.position.x === x && c.position.z === z,
    );
    if (groundCell?.type === "ground") return "#d8cfc4";

    if (mode === "trace" && lastTileId) {
      const last = tiles.find((t) => t.id === lastTileId);
      if (last) {
        const dx = Math.abs(x - last.position.x);
        const dz = Math.abs(z - last.position.z);
        if (dx + dz <= RANGE) return "#666";
      }
    }

    return "#222";
  };

  // --- Export ---
  const exportJson = {
    ground,
    tiles,
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(exportJson, null, 2));
    alert("JSON copié !");
  };

  return (
    <div>
      <h2>Board Designer</h2>

      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setMode("terrain")}>Terrain</button>
        <button onClick={() => setMode("trace")} style={{ marginLeft: 8 }}>
          Tracé
        </button>

        {mode === "trace" && (
          <select
            value={placingType}
            onChange={(e) => setPlacingType(e.target.value as TileType)}
            style={{ marginLeft: 16 }}
          >
            <option value="start">Start</option>
            <option value="walkable">Walkable</option>
            <option value="finish">Finish</option>
          </select>
        )}

        {mode === "terrain" && (
          <span style={{ marginLeft: 16 }}>
            Brush:
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ marginLeft: 8 }}
            />
            <strong style={{ marginLeft: 6 }}>
              {brushSize}×{brushSize}
            </strong>
          </span>
        )}

        <button style={{ marginLeft: 16 }} onClick={() => setShowJson(true)}>
          Voir JSON
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
          gap: 1,
        }}
      >
        {Array.from({ length: GRID_SIZE }).map((_, z) =>
          Array.from({ length: GRID_SIZE }).map((_, x) => (
            <div
              key={`${x}-${z}`}
              onClick={() => handleClickCell(x, z)}
              style={{
                width: 20,
                height: 20,
                background: getCellColor(x, z),
                border: "1px solid #111",
              }}
            />
          )),
        )}
      </div>

      {showJson && (
        <div className="modal">
          <button onClick={copyJson}>Copier</button>
          <button onClick={() => setShowJson(false)}>Fermer</button>
          <pre>{JSON.stringify(exportJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
