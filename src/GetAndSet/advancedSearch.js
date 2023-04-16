import getAllFirebaseImages from "./get/getAllFirebaseImages";
import GetImageInformation from "./get/getImageInformation";
import compareNormValues from "../Assets/image-processing/compareNormValues";
import formatNormValues from "../Assets/image-processing/formatNormValues";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";

export default async function advancedSearch(baseValues,range) {
    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message){
        for(let image of imageData.data.images){
            const imageInfo = await GetImageInformation(image,range);
            if(imageInfo.status){
                const normValues = imageInfo.payload.normValues.arrayValue.values;
                const formattedValues = formatNormValues(normValues);
                const comparedValues = compareNormValues(baseValues,formattedValues);
                if(comparedValues){
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