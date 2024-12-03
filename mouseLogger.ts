import {mouse, Point, Region, sleep} from "@nut-tree-fork/nut-js";
import {getAkWindow} from "./src/utils/utils";

async function main() {
  const akWindow = await getAkWindow();

  let firstLine = true;

  while (akWindow) {
    if (firstLine) {
      firstLine = false;
    } else {
      process.stdout.moveCursor(0, -1); // up one line
      process.stdout.clearLine(1); // from cursor to end
    }

    const [akRegion, mousePoint] = await Promise.all([akWindow.region, mouse.getPosition()]);
    const relX = (mousePoint.x - akRegion.left) / akRegion.width;
    const relY = (mousePoint.y - akRegion.top) / akRegion.height;

    console.log(akRegion, mousePoint, [relX, relY]);

    await sleep(1000);
  }
}

main();