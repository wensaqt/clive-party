import type { Ground } from "./ground.interface";

export function Ground({ ground: cell }: { ground: Ground }) {
  const color = cell.type === "ground" ? "#c2b280" : "#111";

  return (
    <mesh position={[cell.position.x, cell.position.y, cell.position.z]}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
