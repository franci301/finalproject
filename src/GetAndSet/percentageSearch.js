import getAllFirebaseImages from "./get/getAllFirebaseImages";
import GetImageInformation from "./get/getImageInformation";
import calculateAndComparePercentages from "../Assets/image-processing/calculateAndComparePercentages";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";

/**
 * @param {string} values - list of colours and their percentages
 * @param {number} range - search radius in km
 */
export default async function percentageSearch(values, range){
    // fetch all images inside the database
    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message){
        for(let image of imageData.data.images){
            // get the information of the image
            const imageInfo = await GetImageInformation(image, range);
            if(imageInfo.status){
                const imageValues = imageInfo.payload.imageValues.mapValue.fields;
                // calculate the percentage values for each image and compare them to the ones specified by the user
                const percentages = calculateAndComparePercentages(values,imageValues);
                if(percentages.size > 0){
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