import {mouse, Point, Region, sleep} from "@nut-tree-fork/nut-js";
import {relPointToAbsPoint} from "./utils";

export interface ClickRelativePositionParams {
  akRegion: Region;
  point: Point;
}

/**
 * Click ar a target relative position.
 */
export async function clickRelativePosition({ akRegion, point }: ClickRelativePositionParams) {
  await mouse.setPosition(relPointToAbsPoint(point, akRegion));
  await mouse.leftClick();
  await sleep(10);
}