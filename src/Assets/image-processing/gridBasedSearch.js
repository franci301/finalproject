import getAllFirebaseImages from "../../GetAndSet/get/getAllFirebaseImages";
import GetImageInformation from "../../GetAndSet/get/getImageInformation";
import compareHistValues from "./compareHistValues";
import GetSingleImageFromFolder from "../../GetAndSet/get/getSingleImageFromFolder";

export default async function gridBasedSearch(colours, range=2){
    console.log(colours)
    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message) {
        for (let image of imageData.data.images) {
            const imageInfo = await GetImageInformation(image,range);
            if(imageInfo.status) {
                const blocks = imageInfo.payload.histBlock.arrayValue.values;
                const comparedValues = compareHistValues(colours, blocks);
                if(comparedValues.length > 0){
                    const serverImage = await GetSingleImageFromFolder(imageData.folderName,image);
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