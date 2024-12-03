import { UIElements } from "../gameData/uiElements";
import {AssessorParams} from "./assessorParams";

/**
 * UI elements that are relevant for interrupt routines on the Shop screen.
 */
export namespace ShopAssessor {
  export function artifactSelectionPopup({ uiElements }: AssessorParams) {
    return uiElements.includes(UIElements.Shop.artifactSelectionPopup);
  }
}