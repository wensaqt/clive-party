import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Board } from "./board/board";
import { SAVED_BOARD_1 } from "./data/saved-boards/SAVED_BOARD_1";

export function Game() {
  return (
    <Canvas
      camera={{
        position: [5, 5, 5],
        fov: 50,
      }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <axesHelper args={[5]} />

      <OrbitControls />

      <Board board={SAVED_BOARD_1} />
    </Canvas>
  );
}
