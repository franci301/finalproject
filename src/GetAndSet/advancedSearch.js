import getAllFirebaseImages from "./get/getAllFirebaseImages";
import GetImageInformation from "./get/getImageInformation";
import compareNormValues from "../Assets/image-processing/compareNormValues";
import formatNormValues from "../Assets/image-processing/formatNormValues";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";

/**
 * @param {number} baseValues - list of normalized rgb values
 * @param {number} range - search radius in km
 */
export default async function advancedSearch(baseValues,range) {
    // fetch all images in firebase database
    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message){
        for(let image of imageData.data.images){
            // fetch image information
            const imageInfo = await GetImageInformation(image,range);
            if(imageInfo.status){
                const normValues = imageInfo.payload.normValues.arrayValue.values;
                // format the normalized values got from the image in the database
                const formattedValues = formatNormValues(normValues);
                // compare the two normalized values
                const comparedValues = compareNormValues(baseValues,formattedValues);
                if(comparedValues){
                    // fetch the image from the server
                    const serverImage = await GetSingleImageFromServer(imageData.folderName,image);
                    if(serverImage.status){
                        arr.push({
                            image:serverImage.image,
                            imageInfo:imageInfo,
                            folderName: imageData.folderName,
                        })
                    }
                }
            }
        }
    }
    return arr;
}