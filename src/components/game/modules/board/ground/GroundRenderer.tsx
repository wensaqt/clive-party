import type { GroundStructure } from "../board.types";
import { Ground } from "./Ground";
import { buildGroundMap, getGroundMask, maskToShape } from "./ground.utils";

interface GroundRendererProps {
  grounds: GroundStructure[];
}

export function GroundRenderer({ grounds }: GroundRendererProps) {
  const groundMap = buildGroundMap(grounds);

  return (
    <>
      {grounds.map((g, i) => {
        if (g.type === "empty") return null;

        const mask = getGroundMask(groundMap, g.position.x, g.position.z);

        const shape = maskToShape(mask);

        return <Ground key={i} ground={{ ...g, shape }} />;
      })}
    </>
  );
}
