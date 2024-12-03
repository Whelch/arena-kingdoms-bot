import { UIElements } from "../gameData/uiElements";
import {AssessorParams} from "./assessorParams";

/**
 * UI elements that are relevant for interrupt routines on the Shop screen.
 */
export namespace CampAssessor {
  export function connectionErrorPopup({ uiElements }: AssessorParams) {
    return uiElements.includes(UIElements.Camp.errorPopup);
  }
}