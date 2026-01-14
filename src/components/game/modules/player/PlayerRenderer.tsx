// PlayerRenderer.tsx
import { Html } from "@react-three/drei";
import { usePlayerController } from "./hooks/usePlayerController";

export function PlayerRenderer() {
  const { players } = usePlayerController();
  console.log(players);

  return (
    <>
      {players.map((player) => {
        if (!player.position) return null;

        return (
          <mesh key={player.id} position={player.position}>
            <boxGeometry args={[0.4, 0.8, 0.4]} />
            <meshStandardMaterial color="red" />

            <Html position={[0, 0.8, 0]} center distanceFactor={10}>
              <div
                style={{
                  background: "rgba(0,0,0,0.75)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {player.nickname}
              </div>
            </Html>
          </mesh>
        );
      })}
    </>
  );
}
