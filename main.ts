import { getAkWindow } from "./src/utils/utils";
import { sleep } from "@nut-tree-fork/nut-js";
import {getUiElements} from "./src/gameData/getUiElements";
import {getGameState} from "./src/gameData/getGameState";
import {RootAssessor} from "./src/screenAssessors/rootAssessor";
import {campEvaluator} from "./src/routines/camp/campEvaluator";
import {shopEvaluator} from "./src/routines/shop/shopEvaluator";
import {battleResultsEvaluator} from "./src/routines/battleResults/battleResultsEvaluator";
import {endRunEvaluator} from "./src/routines/endRun/endRunEvaluator";

async function main() {
  const akWindow = await getAkWindow();

  while (true) {
    const [akRegion, uiElements, gameState] = await Promise.all([
      akWindow.region,
      getUiElements(),
      getGameState()
    ]);

    if (RootAssessor.camp({ uiElements })) {
      await campEvaluator({ akRegion, uiElements });
    } else if (RootAssessor.shop({ uiElements})) {
      await shopEvaluator({ akRegion, uiElements, gameState });
    } else if (RootAssessor.battleResults({ uiElements })) {
      await battleResultsEvaluator({ uiElements, akRegion })
    } else if (RootAssessor.endRun({ uiElements })) {
      await endRunEvaluator({ uiElements, akRegion })
    }

    await sleep(1000);
  }
}

main();