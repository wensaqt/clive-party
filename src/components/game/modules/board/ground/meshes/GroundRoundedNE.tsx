import { Sphere } from "@react-three/drei";

export function GroundRoundedNE() {
  return (
    <group>
      {/* Corps */}
      <mesh position={[-0.05, 0, 0.05]}>
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial color="#c2b280" />
      </mesh>

      {/* Quart de sphère */}
      <Sphere
        args={[0.5, 32, 32, 0, Math.PI / 2, 0, Math.PI / 2]}
        position={[0.45, 0, -0.45]}
      >
        <meshStandardMaterial color="#c2b280" />
      </Sphere>
    </group>
  );
}
