import {RoutineEvaluatorBaseParams} from "../routineEvaluatorBaseParams";
import {clickRelativePosition} from "../../utils/clickRelativePosition";
import {Coords} from "../../gameData/coordinates";

/**
 * Evaluate what to do from this screen.
 */
export async function endRunEvaluator({ uiElements, akRegion }: RoutineEvaluatorBaseParams) {
  await clickRelativePosition({
    akRegion,
    point: Coords.EndRun.nextButton,
  })
}