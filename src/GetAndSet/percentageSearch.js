import getAllFirebaseImages from "./get/getAllFirebaseImages";
import GetImageInformation from "./get/getImageInformation";
import calculateAndComparePercentages from "../Assets/image-processing/calculateAndComparePercentages";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";

export default async function percentageSearch(values, range){
    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message){
        for(let image of imageData.data.images){
            const imageInfo = await GetImageInformation(image, range);
            if(imageInfo.status){
                const imageValues = imageInfo.payload.imageValues.mapValue.fields;
                const percentages = calculateAndComparePercentages(values,imageValues);
                console.log(percentages);
                if(percentages.size > 0){
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