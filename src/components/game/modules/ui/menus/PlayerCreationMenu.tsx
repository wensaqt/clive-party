import { useState } from "react";
import { usePlayerController } from "../../player/hooks/usePlayerController";

export function PlayerCreationMenu() {
  const [nickname, setNickname] = useState("");
  const { createPlayer } = usePlayerController();

  const handleCreate = () => {
    createPlayer(nickname || undefined);
    setNickname(""); // reset
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <input
        type="text"
        placeholder="Player nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ padding: "4px" }}
      />
      <button onClick={handleCreate}>Create player</button>
    </div>
  );
}
