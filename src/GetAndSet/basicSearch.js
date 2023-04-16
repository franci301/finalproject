import GetAllImagesInFolder from "./get/getAllImagesInFolder";
import GetImageInformation from "./get/getImageInformation";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";

/**
 * @param {string} value - folder name
 * @param {number} range - search radius
 */

export default async function basicSearch(value,range){
    const result = await GetAllImagesInFolder(value);
    let arr = [];
    for(let imageData of result.payload.message){
        const imageInfo = await GetImageInformation(imageData.stringValue, range);
        if(imageInfo.status){
            const imageValue = await GetSingleImageFromServer(value, imageData.stringValue);
            if(imageValue.status){
                let data = {
                    folderName : value,
                    image : {
                        data :imageInfo.payload,
                        image : imageValue.image,
                    },
                }
                arr.push(data);
            }
        }
    }
    return arr;
}