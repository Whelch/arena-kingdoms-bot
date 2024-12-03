import { sleep, screen, Region, mouse } from '@nut-tree-fork/nut-js';
import {getAkWindow, relRegionToAbsRegion} from "./src/utils/utils";
import {Coords} from "./src/gameData/coordinates";

async function main() {
  await sleep(1000);
  const akWindow = await getAkWindow();

  const [akRegion] = await Promise.all([akWindow.region]);

  const targetRegion = relRegionToAbsRegion(new Region(.56, .875, .085, .04), akRegion);
  await screen.highlight(targetRegion);
  await screen.captureRegion(`battlefield_continue_button.png`, targetRegion);

  // for (let i = 0; i < Coords.GauntletHeroSelect.heroes.length; i++) {
  //   const h1Region = relRegionToAbsRegion(Coords.GauntletHeroSelect.heroes[i], akRegion);
  //
  //   await mouse.setPosition({ x: h1Region.left, y: h1Region.top })
  //
  //   await screen.highlight(h1Region);
  //   await screen.captureRegion(`${Coords.GauntletHeroSelect.heroNames[i]}.png`, h1Region);
  // }

  await sleep(2000);
}

main();