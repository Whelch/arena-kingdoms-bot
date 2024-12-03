import {Region, sleep} from "@nut-tree-fork/nut-js";
import {GameState} from "../../gameData/getGameState";
import {clickRelativePosition} from "../../utils/clickRelativePosition";
import {Coords} from "../../gameData/coordinates";

export interface ArtifactSelectionRoutineParams {
  akRegion: Region;
  gameState: GameState;
}

export async function artifactSelectionRoutine({
  akRegion,
  gameState,
}: ArtifactSelectionRoutineParams) {
  await clickRelativePosition({
    akRegion,
    point: Coords.Shop.artifactChest
  });
  await sleep(2000);

  if (gameState.artifactShopItems.length === 2) {
    await clickRelativePosition({
      akRegion,
      point: Coords.Shop.artifacts2[Math.floor(Math.random()*2)]
    });
  }

  await clickRelativePosition({
    akRegion,
    point: Coords.Shop.getRelic
  });
}