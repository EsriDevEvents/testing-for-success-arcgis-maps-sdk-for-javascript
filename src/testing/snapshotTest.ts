import pixelmatch from "pixelmatch";
import { PNG } from "pngjs/browser";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join } from "path";

function compareImages(
  image1Path: string,
  image2Path: string,
  diffPath: string
) {
  const img1 = PNG.sync.read(readFileSync(image1Path));
  const img2 = PNG.sync.read(readFileSync(image2Path));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1, // Sensitivity (lower means stricter)
    }
  );

  writeFileSync(diffPath, PNG.sync.write(diff));

  return numDiffPixels;
}

export function snapshotTest(componentName: string, newImagePath: string) {
  // Paths for images
  const screenshotDirectory = "./__screenshots__";

  if (!existsSync(screenshotDirectory)) {
    console.log(newImagePath);
    console.log("Creating screenshot directory");
    mkdirSync(screenshotDirectory);
  }

  const baseline = join(
    screenshotDirectory,
    "baseline",
    `${componentName}.png`
  );
  const diffImage = join(screenshotDirectory, "diffs", `${componentName}.pnt`);

  if (!existsSync(baseline)) {
    // Save the new image as the snapshot if no baseline exists
    copyFileSync(newImagePath, baseline);
    console.log("Previous baseline wasn't set. Setting it now.");
  }

  // Compare images
  const diffPixels = compareImages(baseline, newImagePath, diffImage);

  return {
    baseline,
    diffImage,
    diffs: diffPixels,
  };
}
