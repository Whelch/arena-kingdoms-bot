import {Region} from "@nut-tree-fork/nut-js";
import {GameState} from "../../gameData/getGameState";
import {CardShopData, getCardShopData, UnitClass, UnitFaction, UnitRarity} from "../../gameData/getCardShopData";
import {evaluateInnateCard, getShopItemLevel} from "../../utils/utils";

const emptyFactionMap: Record<UnitFaction, number> = {
  [UnitFaction.Human]: 0,
  [UnitFaction.Avian]: 0,
  [UnitFaction.Feline]: 0,
  [UnitFaction.Magma]: 0,
  [UnitFaction.Polar]: 0,
  [UnitFaction.Steampunk]: 0,
};

const emptyClassMap: Record<UnitClass, number> = {
  [UnitClass.Archer]: 0,
  [UnitClass.Healer]: 0,
  [UnitClass.Mage]: 0,
  [UnitClass.Rogue]: 0,
  [UnitClass.Tank]: 0,
  [UnitClass.Warrior]: 0,
};

export interface ArtifactSelectionRoutineParams {
  akRegion: Region;
  gameState: GameState;
}

export interface CardValues {
  name: string;
  /**
   * 1, 2, 3
   */
  level: number;
  /**
   * 1, 2, 3
   */
  rarity: number;
  class: UnitClass;
  faction: UnitFaction;
  /**
   * Cost is either the cost shop, or the value from selling that unit (if it's already on the board)
   */
  cost: number;
}

interface Evaluation {
  card: CardValues;
  initialValue: number;
  /**
   * Added after initialValue is used to generate preferred faction map
   */
  factionBump?: number;
  /**
   * Added after initialValue is used to generate preferred class map
   */
  classBump?: number;
}

export async function mainRoutine({
  akRegion,
  gameState,
}: ArtifactSelectionRoutineParams) {

  const shopItems = await Promise.all(gameState.shopItems.map(getCardShopData));
  const shopItemCards = shopItems.map(cardShopItemToCardEvaluation);

  const placements = await Promise.all(gameState.comp.placements
    .map(({characterType}) => characterType)
    .map(getCardShopData)
  );
  const placementCards = placements.map(placementItemToCardEvaluation);

  const sortedCards = [...shopItemCards, ...placementCards].sort((a, b) => b.initialValue - a.initialValue);

  // console.log(placements);

  console.log(sortedCards.map((evaluation) => [evaluation.card.name, evaluation.initialValue]));


  const bench = await Promise.all(gameState.comp.bench
    .map(({characterType}) => characterType)
    .map(getCardShopData)
  );

  const placedFactions = placements.reduce<Record<UnitFaction, number>>((agg, next) => {
    agg[next.CardFaction]++;
    return agg;
  }, {...emptyFactionMap});

  const placedClasses = placements.reduce<Record<UnitClass, number>>((agg, next) => {
    agg[next.CardClass]++;
    return agg;
  }, {...emptyClassMap});

  const shopFactions = shopItems.reduce<Record<UnitFaction, number>>((agg, next) => {
    agg[next.CardFaction]++;
    return agg;
  }, {...emptyFactionMap});

  const shopClasses = shopItems.reduce<Record<UnitClass, number>>((agg, next) => {
    agg[next.CardClass]++;
    return agg;
  }, {...emptyClassMap});

  // const shopItemEvaluations = shopItems.map(((shopItem) => {
  //   if (shopItem.CardCost <= gameState.gold) {
  //     let value = 0;
  //
  //     const upgradeOnBoard = canUpgradeInSearch({shopItem, searchData: [...placements, ...bench]});
  //     const upgradeWithShop = canUpgradeInSearch({shopItem, searchData: shopItems, isInSearchData: true})
  //     const stepTowardsUpgrade = !upgradeWithShop && canUpgradeInSearch({
  //       shopItem,
  //       searchData: [...placements, ...bench],
  //       isStepTowardsUpgrade: true
  //     })
  //     const doubleUpgrade = upgradeOnBoard && stepTowardsUpgrade;
  //
  //     const rarityMultiplier = Math.pow(shopItem.RarityType - 1, 2);
  //
  //     if (doubleUpgrade) {
  //       value += 8 * rarityMultiplier;
  //     } else if (upgradeOnBoard) {
  //       value += 6 * rarityMultiplier;
  //     } else if (upgradeWithShop && shopItem.CardCost * 2 <= gameState.gold) {
  //       value += 4 * rarityMultiplier;
  //     } else if (stepTowardsUpgrade) {
  //       value += 2 * rarityMultiplier;
  //     } else {
  //       value += rarityMultiplier;
  //     }
  //
  //     const crossesFactionThreshold = placedFactions[shopItem.CardFaction] === 2
  //       ? 1
  //       : placedFactions[shopItem.CardFaction] === 4
  //         ? 2
  //         : placedFactions[shopItem.CardFaction] === 6
  //           ? 3
  //           : 0;
  //     const crossesClassThreshold = placedClasses[shopItem.CardClass] < 4 ? placedClasses[shopItem.CardClass] : 0;
  //
  //     value += (crossesFactionThreshold + crossesClassThreshold);
  //
  //     const currentFactionTier = placedFactions[shopItem.CardFaction] >= 7
  //       ? 4
  //       : placedFactions[shopItem.CardFaction] >= 5
  //         ? 3
  //         : placedFactions[shopItem.CardFaction] >= 3
  //           ? 2
  //           : placedFactions[shopItem.CardFaction] >= 1
  //             ? 1 // bump for synergy
  //             : 0;
  //     const currentClassTier = placedClasses[shopItem.CardClass] >= 4
  //       ? 4
  //       : placedClasses[shopItem.CardClass] >= 3
  //         ? 3
  //         : placedClasses[shopItem.CardClass] >= 2
  //           ? 2
  //           : placedClasses[shopItem.CardClass] >= 1
  //             ? 1 // bump for synergy
  //             : 0;
  //
  //     value += currentClassTier + currentFactionTier;
  //
  //     return value;
  //   } else {
  //     return 0;
  //   }
  // }));
  //
  // const placementEvaluations = placements.map((placementItem) => {
  //   const rarityMultiplier = Math.pow(2, placementItem.RarityType - 1);
  //   let value = getShopItemLevel(placementItem) * rarityMultiplier;
  //
  //   if (placementItem.RarityString === UnitRarity.Legendary) {
  //     value += 100; // hero is invaluable
  //   }
  //
  //   const providesFactionThreshold = placedFactions[placementItem.CardFaction] === 7
  //     ? 4
  //     : placedFactions[placementItem.CardFaction] === 5
  //       ? 3
  //       : placedFactions[placementItem.CardFaction] === 3
  //         ? 2
  //         : placedFactions[placementItem.CardFaction] >= 2 // 2 because this card counts
  //           ? 1 // bump for synergyy
  //           : 0;
  //
  //   const providesClassThreshold = placedClasses[placementItem.CardClass] === 4
  //     ? 4
  //     : placedClasses[placementItem.CardClass] === 3
  //       ? 3
  //       : placedClasses[placementItem.CardClass] === 2
  //         ? 2
  //         : 0;
  //
  //   value += providesFactionThreshold + providesClassThreshold;
  //
  //   return value;
  // });

  // console.log(shopItemEvaluations, placementEvaluations);

  // const remainingShopItems = shopItemEvaluations
  //   .filter((value) => gameState.gold <= 5 && gameState.benchLimit > gameState.comp.placements.length)
  //   .sort();

  // await clickRelativePosition({
  //   akRegion,
  //   point: Coords.Shop.battleButton
  // });

  // await sleep(10);
  // await clickRelativePosition({
  //   akRegion,
  //   point: {
  //     x: .6,
  //     y: .65,
  //   }
  // });
}

interface CanUpgradeInSearchParams {
  shopItem: CardShopData;
  searchData: CardShopData[];
  /**
   * When true, this just means we need to find 2 instances of the shopItem; one of which is itself.
   */
  isInSearchData?: boolean;

  /**
   * when true, will look for level 2 units that would be upgraded by this one.
   */
  isStepTowardsUpgrade?: boolean;
}

/**
 * Returns true if this unit would directly upgrade something in the target {@link searchData}.
 */
function canUpgradeInSearch({
  shopItem,
  searchData,
  isInSearchData = false,
  isStepTowardsUpgrade = false
}: CanUpgradeInSearchParams) {
  const shopItemLevel = isStepTowardsUpgrade ? 2 : getShopItemLevel(shopItem);

  return searchData.filter((placedShopItem) => {
    return getShopItemLevel(placedShopItem) === shopItemLevel && placedShopItem.CardName === shopItem.CardName
  }).length >= (isInSearchData ? 2 : 1);
}

/**
 * Converts an item from the board to a {@link Evaluation}
 */
function placementItemToCardEvaluation(cardData: CardShopData): Evaluation {
  let cost = -100;
  switch (cardData.RarityType) {
    case 1:
      switch (getShopItemLevel(cardData)) {
        case 1:
          cost = 1;
          break;
        case 2:
          cost = 3;
          break;
        case 3:
          cost = 6;
          break;
      }
    case 2:
    case 3:
      switch (getShopItemLevel(cardData)) {
        case 1:
          cost = 2;
          break;
        case 2:
          cost = 4;
          break;
        case 3:
          cost = 8;
          break;
      }
  }

  const card = {
    class: cardData.CardClass,
    faction: cardData.CardFaction,
    name: cardData.CardName,
    level: getShopItemLevel(cardData),
    rarity: cardData.RarityType,
    cost: cost,
  }

  return {
    card,
    initialValue: evaluateInnateCard(card),
  }
}

/**
 * Converts an item from the card shop to a {@link Evaluation}
 */
function cardShopItemToCardEvaluation(cardData: CardShopData): Evaluation {
  const card = {
    class: cardData.CardClass,
    faction: cardData.CardFaction,
    name: cardData.CardName,
    level: getShopItemLevel(cardData),
    rarity: cardData.RarityType,
    cost: cardData.RarityType+1,
  }

  return {
    card,
    initialValue: evaluateInnateCard(card),
  }
}