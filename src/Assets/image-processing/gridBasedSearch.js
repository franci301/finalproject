import getAllFirebaseImages from "../../GetAndSet/get/getAllFirebaseImages";
import GetImageInformation from "../../GetAndSet/get/getImageInformation";
import compareHistValues from "./compareHistValues";
import GetSingleImageFromServer from "../../GetAndSet/get/getSingleImageFromServer";

export default async function gridBasedSearch(colours, range){

    const allImages = await getAllFirebaseImages();
    let arr = [];
    for(let imageData of allImages.payload.message) {
        for (let image of imageData.data.images) {
            const imageInfo = await GetImageInformation(image,range);
            if(imageInfo.status) {
                const blocks = imageInfo.payload.histBlock.arrayValue.values;
                const comparedValues = compareHistValues(colours, blocks);
                if(comparedValues.length > 0){
                    const serverImage = await GetSingleImageFromServer(imageData.folderName,image);
                    if(serverImage.status){
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

function findMostFrequentIndex(data) {
  const counts = data.reduce((acc, item) => {
    acc[item.index] = (acc[item.index] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}