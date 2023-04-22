import getAllFirebaseImages from "./getAllFirebaseImages";
import GetImageInformation from "./getImageInformation";
import GetSingleImageFromServer from "./getSingleImageFromServer";

export default async function fetchImagesForBrowsing(){
    const allImages = await getAllFirebaseImages();
    let arr = [];
    if(allImages.status){
        for(let image of allImages.payload.message){
            for(let imageName of image.data.images){
                const imageInformation = await GetImageInformation(imageName, -1);
                if(imageInformation.status){
                    const serverImage = await GetSingleImageFromServer(image.folderName,imageName);
                    let data = {
                        folderName: image.folderName,
                        image: {
                            image:serverImage.image,
                            data:imageInformation.payload,
                        }
                    }
                    arr.push(data);
                }
            }
        }
    }
    return arr;
}