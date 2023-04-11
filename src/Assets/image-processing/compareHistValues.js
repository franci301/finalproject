import colorCategories from './searchShortcut'; // Import the color categories

export default function compareHistValues(baseValues, blockValues) {


    // Helper function to find the category of a color
    const findCategory = (color) => {
        const categoryKey = Object.keys(colorCategories).find(key => colorCategories[key].includes(color));
        return colorCategories[categoryKey];
    };

    const comparisonResults = [];

    for (let i = 0; i < baseValues.length; i++) {
        const color1 = baseValues[i];
        const color1Category = findCategory(color1);
        const color2Object = blockValues[i].mapValue.fields;
        const color2 = Object.keys(color2Object).find(key => color2Object[key].integerValue > 0);

        if (color1 === color2) {
            comparisonResults.push({ index: i, message: `Both grids have the same color '${color1}' at index ${i}.` });
        } else if (Object.keys(color2Object).some(key => color1Category.includes(key))) {
            comparisonResults.push({ index: i, message: `A color from the same category as '${color1}' exists in both grids, but not at the same index.` });
        } else if (Object.keys(color2Object).includes(color1)) {
            comparisonResults.push({ index: i, message: `The color '${color1}' exists in both grids, but not at the same index.` });
        }
    }

    console.log(comparisonResults);
    return comparisonResults;
}