import { PlayerCreationMenu } from "./menus/PlayerCreationMenu";
export function UserInterfaceRenderer() {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
      }}
    >
      <PlayerCreationMenu />
    </div>
  );
}
