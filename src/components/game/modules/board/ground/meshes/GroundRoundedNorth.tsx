import { Cylinder } from "@react-three/drei";

export function GroundRoundedNorth() {
  return (
    <group>
      {/* Corps */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1, 0.1, 0.9]} />
        <meshStandardMaterial color="#c2b280" />
      </mesh>

      {/* Arrondi */}
      <Cylinder
        args={[0.5, 0.5, 0.1, 32, 1, false, 0, Math.PI]}
        position={[0, 0, -0.45]}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial color="#c2b280" />
      </Cylinder>
    </group>
  );
}
