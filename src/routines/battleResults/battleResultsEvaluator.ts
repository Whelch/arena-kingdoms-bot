import {RoutineEvaluatorBaseParams} from "../routineEvaluatorBaseParams";
import {clickRelativePosition} from "../../utils/clickRelativePosition";
import {Coords} from "../../gameData/coordinates";

/**
 * Evaluate what to do from this screen.
 */
export async function battleResultsEvaluator({ uiElements, akRegion }: RoutineEvaluatorBaseParams) {
  await clickRelativePosition({
    akRegion,
    point: Coords.BattleResults.continueButton
  });
}