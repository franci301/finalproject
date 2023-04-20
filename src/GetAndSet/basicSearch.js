import GetAllImagesInFolder from "./get/getAllImagesInFolder";
import GetImageInformation from "./get/getImageInformation";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";

/**
 * @param {string} value - folder name
 * @param {number} range - search radius
 */

export default async function basicSearch(value,range){
    let arr = [];
    // fetch all images inside the folder specified by the user
    const result = await GetAllImagesInFolder(value);
    if(result.status){
        for(let imageData of result.payload.message){
            // get information about the image
            const imageInfo = await GetImageInformation(imageData.stringValue, range);
            if(imageInfo.status){
                // fetch the image from the server
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
    }else{
        return {
            status : false,
            message: result.payload.message,
        }
    }

    return {
        status:true,
        message: arr,
    };
}