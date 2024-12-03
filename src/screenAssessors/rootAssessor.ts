import { UIElements } from "../gameData/uiElements";
import {AssessorParams} from "./assessorParams";

/**
 * Determine the high-level main screen we are looking at.
 */
export namespace RootAssessor {
  export function camp({ uiElements }: AssessorParams) {
    return uiElements.includes(UIElements.Camp.root);
  }
  export function shop({ uiElements }: AssessorParams) {
    return uiElements.includes(UIElements.Shop.root);
  }
  export function battleResults({ uiElements }: AssessorParams) {
    return uiElements.includes(UIElements.BattleResults.root);
  }
  export function endRun({ uiElements }: AssessorParams) {
    return uiElements.includes(UIElements.EndRun.root);
  }
}