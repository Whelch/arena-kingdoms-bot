import {Point, Region} from "@nut-tree-fork/nut-js";
import {relRegionToAbsRegion} from "../utils/utils";

export namespace Coords {
  export namespace Shop {
    /**
     * Position of the lower left point on the field.
     */
    export const gridPosition00: Point = {
      x: .34,
      y: .67
    }

    /**
     * For every increase in x position, add this multiplier.
     */
    export const gridXPositionMultiplier = .027;
    /**
     * for every increase in y position, add this multiplier.
     */
    export const gridYPositionMultiplier = -.085;

    /**
     * Button that starts the battle
     */
    export const battleButton: Point = {x: .85, y: .92}
    /**
     * Button to get artifact during Artifact Selection
     */
    export const getRelic: Point = {x: .5, y: .8}
    /**
     * Button to crack open the artifact chest during selection
     */
    export const artifactChest: Point = {x: .5, y: .5}
    /**
     * artifact selection screen positions when 2 are available
     */
    export const artifacts2: Point[] = [
      {x: .4, y: .5},
      {x: .6, y: .5},
    ]
  }

  export namespace Camp {
    export const campTab: Point = {
      x: .03,
      y: .28,
    }
    export const arenaTab: Point = {
      x: .03,
      y: .37,
    }
    export const heroesTab: Point = {
      x: .03,
      y: .46,
    }
    export const gauntletStart: Point = {
      x: .5,
      y: .93,
    }

    export const errorPopupCloseButton: Point = {
      x: .5,
      y: .7
    }
  }

  export namespace BattleResults {
    export const continueButton: Point = {x: .6, y: .89}
  }

  export namespace EndRun {
    export const nextButton: Point = { x: .5, y: .795 };
  }
}
