import getAllFirebaseImages from "../../GetAndSet/get/getAllFirebaseImages";
import GetImageInformation from "../../GetAndSet/get/getImageInformation";
import compareHistValues from "./compareHistValues";
import GetSingleImageFromServer from "../../GetAndSet/get/getSingleImageFromServer";


/**
 * @param {number} colours - list of grid colours
 * @param {number} range - search radius in km
 */
export default async function gridBasedSearch(colours, range){
    // fetch all images from firebase database
    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message) {
        for (let image of imageData.data.images) {
            // fetch information for each image
            const imageInfo = await GetImageInformation(image,range);
            if(imageInfo.status) {
                const blocks = imageInfo.payload.histBlock.arrayValue.values;
                // compare the histogram values
                const comparedValues = compareHistValues(colours, blocks);
                if(comparedValues.length > 0){
                    // fetch the image from the server
                    const serverImage = await GetSingleImageFromServer(imageData.folderName,image);
                    if(serverImage.status){
                        // find the most frequent index for the image
                        // the index represents the text to give it
                        const highest = findMostFrequentIndex(comparedValues);
                        arr.push({
                            image: serverImage.image,
                            imageInfo: imageInfo,
                            folderName: imageData.folderName,
                            index: highest-1,
                        });
                    }
                }
            }
        }
    }
    return arr;
}

// find the most frequent index from a list
function findMostFrequentIndex(data) {
  const counts = data.reduce((acc, item) => {
    acc[item.index] = (acc[item.index] || 0) + 1;
    return acc;
  }, {})
  return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}