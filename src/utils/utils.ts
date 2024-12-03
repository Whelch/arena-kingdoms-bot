import {getWindows, Point, Region} from "@nut-tree-fork/nut-js";
import {CardShopData} from "../gameData/getCardShopData";
import {CardValues} from "../routines/shop/mainRoutine";

export async function getAkWindow() {
  const windows = await getWindows();

  const windowNames = await Promise.all(windows.map(({title}) => title));
  const akWindowIndex = windowNames.findIndex((title) => title === 'Arena Kingdoms');
  return windows[akWindowIndex];
}

/**
 * Takes in a region with relative (percentage) region coordinates within the AK window,
 * and converts them to a screen-space pixel region.
 */
export function relRegionToAbsRegion(relRegion: Region, akRegion: Region): Region {
  return new Region(
    akRegion.left + (akRegion.width*relRegion.left),
    akRegion.top + (akRegion.height*relRegion.top),
    relRegion.width*akRegion.width,
    relRegion.height*akRegion.height,
  )
}

/**
 * Takes in a region with relative (percentage) region coordinates within the AK window,
 * and converts them to a screen-space pixel region.
 */
export function relPointToAbsPoint(relPoint: Point, akRegion: Region): Point {
  return {
    x: akRegion.left + (akRegion.width * relPoint.x),
    y: akRegion.top + (akRegion.height * relPoint.y),
  }
}

export function getShopItemLevel(shopItem: CardShopData): 1 | 2 | 3 {
  return +shopItem.Uid[shopItem.Uid.length - 1] as 1 | 2 | 3;
}

/**
 * Evaluates a card based on its rarity, level, and cost.
 */
export function evaluateInnateCard(card: CardValues): number {
  const rarityScaler = Math.pow(2, card.rarity-1);
  const levelScaler = Math.pow(card.level, 3);
  return ((rarityScaler * levelScaler) + card.rarity) - card.cost;
}