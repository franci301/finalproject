import ColorLib from 'color';
import DeltaE from 'delta-e';

export default function analyzeImage(image, threshold = 10, distanceThreshold = 5) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);

    const imageData = context.getImageData(0, 0, image.width, image.height).data;
    const colorCounts = {};

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];

      const labColor = ColorLib({r, g, b}).lab().round().array();
      const labString = labColor.toString();

      if (colorCounts[labString]) {
        colorCounts[labString].count++;
      } else {
        colorCounts[labString] = { color: labColor, count: 1 };
      }
    }

    const totalPixels = image.width * image.height;
    const colorPercentage = {};

    for (const labString in colorCounts) {
      const percentage = (colorCounts[labString].count / totalPixels) * 100;
      if (percentage >= threshold) {
        colorPercentage[labString] = {
          color: ColorLib.lab(colorCounts[labString].color).rgb().round().array(),
          percentage: percentage.toFixed(2),
        };
      }
    }

    const results = [];

    for (const labString in colorPercentage) {
      let grouped = false;
      for (const result of results) {
        const color1 = ColorLib.lab(labString.split(',').map(Number));
        const color2 = ColorLib.lab(result.lab.split(',').map(Number));
        const deltaE = DeltaE.getDeltaE76(color1, color2);

        if (deltaE <= distanceThreshold) {
          result.percentage = (
            parseFloat(result.percentage) +
            parseFloat(colorPercentage[labString].percentage)
          ).toFixed(2);
          grouped = true;
          break;
        }
      }

      if (!grouped) {
        results.push({
          lab: labString,
          rgb: colorPercentage[labString].color,
          percentage: colorPercentage[labString].percentage,
        });
      }
    }
    resolve(results);
  });
}

