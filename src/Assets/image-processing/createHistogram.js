import nearestColor from "nearest-color";
import colourNamesExhaustive from "./colourNamesExhaustive";

export default function createColorHistogram(imageData) {
    const nearest = nearestColor.from(colourNamesExhaustive)

    const data = imageData.data;
    const histogram = new Map([['total-size', data.length]]);


    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const nearestColor = nearest({ r, g, b });
        if (histogram.has(nearestColor.name)) {
            histogram.set(nearestColor.name,histogram.get(nearestColor.name)+1)
        } else {
            histogram.set(nearestColor.name,1)
        }
    }
    const keys = histogram.keys()
    for(let colour of keys){
        if(histogram.get(colour)<1000){
            histogram.delete(colour)
        }
    }
    return histogram;
}