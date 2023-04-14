import colorGroups from '../image-processing/searchShortcut';

export default function calculateAndComparePercentages(original, imageValues) {
  const totalSize = parseInt(imageValues['total-size'].integerValue);
  let map = new Map();

  for (const color in original) {
    const groupColors = mapColorToGroup(colorGroups, color);
    for (const groupColor of groupColors) {
      if (imageValues.hasOwnProperty(groupColor)) {
        const percentage1 = (parseInt(imageValues[groupColor].integerValue) / totalSize) * 100;
        const difference = Math.abs(percentage1 - original[color]);
        console.log(percentage1, original[color], difference);
        if (percentage1 >= original[color]) {
          map.set(groupColor, percentage1);
        }
      }
    }
  }
  return map;
}

function mapColorToGroup(colorGroups, color) {
  for (const group in colorGroups) {
    if (colorGroups[group].includes(color)) {
      console.log(colorGroups[group])
      return colorGroups[group];
    }
  }
  return null;
}
