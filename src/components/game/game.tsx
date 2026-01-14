import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BoardModule } from "./modules/board/BoardModule";
import { PlayerModule } from "./modules/player/PlayerModule";
import { UserInterfaceModule } from "./modules/ui/UserInterfaceModule";

export function Game() {
  // todo: fin a way to properly reposition the board and player depending on board size
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <axesHelper args={[5]} />
        <OrbitControls />

        <BoardModule />
        <PlayerModule />
      </Canvas>
      <UserInterfaceModule />
    </div>
  );
}
