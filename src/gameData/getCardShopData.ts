export enum UnitClass {
  Mage = 'Mage',
  Tank = 'Tank',
  Archer = 'Archer',
  Warrior = 'Warrior',
  Healer = 'Healer',
  Rogue = 'Rogue',
}

export enum UnitFaction {
  Human = 'Human',
  Polar = 'Polar',
  Magma = 'Magma',
  Feline = 'Feline',
  Steampunk = 'Steampunk',
  Avian = 'Avian',
}

export enum UnitRarity {
  Common = 'Common',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
}

export interface CardShopData {
  Uid: string;
  ShopIndex: number;
  CardName: string;
  CardDesc: string;
  CardSprite: string;
  CardBaseType: string;
  CardClass: UnitClass;
  CardFaction: UnitFaction;
  RarityString: UnitRarity;
  RarityType: number;
  CardCost: number
  IsUnit: boolean;
  CardHealth: number;
  CardEnergy: number;
  IsHero: boolean;
  RoundString: number;
}

export async function getCardShopData(unitId: string) {
  const res = await fetch(`http://localhost:8080/shopCardData?unitUid=${unitId}`);

  return await res.json() as CardShopData;
}