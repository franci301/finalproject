import colorGroups from '../image-processing/searchShortcut';

/**
 * @param {{string: number}} original - folder name
 * @param {{string: number}} imageValues - percentage values for the image fetched
 */
export default function calculateAndComparePercentages(original, imageValues) {
    const totalSize = parseInt(imageValues['total-size'].integerValue);
    let map = new Map();

    for (const color in original) {
      const groupColors = mapColorToGroup(colorGroups, color);
      for (const groupColor of groupColors) {
        //   if the colour from the user input is present in the image, we calculate the percentage of that colour in the image and compare it
        if (imageValues.hasOwnProperty(groupColor)) {
          const percentage1 = (parseInt(imageValues[groupColor].integerValue) / totalSize) * 100;
          if (percentage1 >= original[color]) {
            map.set(groupColor, percentage1);
          }
        }
      }
    }
    return map;
  }

/**
 * Function to see if the user search query (colour) is contained within the application list of colours
 * @param {string} colorGroups - List of colours
 * @param {string} color - color inputted by the user
 * @return list colours
*/
function mapColorToGroup(colorGroups, color) {
  for (const group in colorGroups) {
    if (colorGroups[group].includes(color)) {
      return colorGroups[group];
    }
  }
  return null;
}
