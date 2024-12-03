import {RoutineEvaluatorBaseParams} from "../routineEvaluatorBaseParams";
import {startNewGauntletRoutine} from "./startNewGauntletRoutine";
import {CampAssessor} from "../../screenAssessors/campAssessor";
import {clickRelativePosition} from "../../utils/clickRelativePosition";
import {Coords} from "../../gameData/coordinates";

/**
 * Evaluate what to do from this screen.
 */
export async function campEvaluator({ uiElements, akRegion }: RoutineEvaluatorBaseParams) {
  if (CampAssessor.connectionErrorPopup({ uiElements })) {
    await clickRelativePosition({
      akRegion,
      point: Coords.Camp.errorPopupCloseButton,
    });
  } else {
    await startNewGauntletRoutine({ akRegion });
  }
}