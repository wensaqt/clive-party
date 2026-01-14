import type { GroundStructure } from "../board.types";
// import { GroundRoundedNE } from "./meshes/GroundRoundedNE";
// import { GroundRoundedNorth } from "./meshes/GroundRoundedNorth";

export interface GroundProps {
  ground: GroundStructure;
}

export function Ground({ ground }: GroundProps) {
  if (ground.type === "empty") return null;

  const { x, y, z } = ground.position;

  return (
    <group position={[x, y, z]}>
      {ground.shape === "full" && (
        <mesh>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color="#c2b280" />
        </mesh>
      )}
    </group>
  );
}
