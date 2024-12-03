import {RoutineEvaluatorBaseParams} from "../routineEvaluatorBaseParams";
import {GameState} from "../../gameData/getGameState";
import {mainRoutine} from "./mainRoutine";
import {artifactSelectionRoutine} from "./artifactSelectionRoutine";
import { ShopAssessor } from "../../screenAssessors/shopAssessor";

export interface ShopEvaluatorParams extends RoutineEvaluatorBaseParams {
  gameState: GameState;
}

/**
 * Evaluate what to do from this screen.
 */
export async function shopEvaluator({ uiElements, akRegion, gameState }: ShopEvaluatorParams) {
  if (ShopAssessor.artifactSelectionPopup({ uiElements })) {
    await artifactSelectionRoutine({ akRegion, gameState });
  } else {
    await mainRoutine({ akRegion, gameState});
  }
}