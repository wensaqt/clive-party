// src/board/tile/tile.ts
import { Html } from "@react-three/drei";
import { useState } from "react";
import type { Tile } from "./tile.interface";

// --- Types globaux ---

export type TileType = "walkable" | "obstacle" | "start" | "finish";

// --- Props pour le component Tile ---

interface TileProps {
  tile: Tile;
}

// --- Component Tile 3D ---

export function Tile({ tile }: TileProps) {
  const [hovered, setHovered] = useState(false);

  let color = "#bbb";
  if (tile.type === "start") color = "green";
  else if (tile.type === "finish") color = "red";

  return (
    <group>
      <mesh
        position={[tile.position.x, tile.position.y, tile.position.z]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {hovered && (
        <Html
          position={[
            tile.position.x + 10,
            tile.position.y + 10,
            tile.position.z,
          ]}
          center
        >
          <div
            style={{
              background: "white",
              padding: "4px",
              borderRadius: "4px",
              fontSize: "12px",
              border: "1px solid #333",
            }}
          >
            <div>id: {tile.id || "-"}</div>
            <div>
              <b>Previous:</b> {tile.previous?.join(", ") || "-"}
            </div>
            <div>
              <b>Next:</b> {tile.next?.join(", ") || "-"}
            </div>
            <div>
              <b>Type:</b> {tile.type}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
