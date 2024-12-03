import {Region, sleep} from "@nut-tree-fork/nut-js";
import {clickRelativePosition} from "../../utils/clickRelativePosition";
import {Coords} from "../../gameData/coordinates";

export interface StartNewGauntletRoutineParams {
  akRegion: Region;
}

/**
 * Works from any location (without a popup) on the ui homepage
 */
export async function startNewGauntletRoutine({
  akRegion,
}: StartNewGauntletRoutineParams) {
  await clickRelativePosition({
    akRegion,
    point: Coords.Camp.heroesTab
  });

  await sleep(10);

  await clickRelativePosition({
    akRegion,
    point: Coords.Camp.gauntletStart
  });
}