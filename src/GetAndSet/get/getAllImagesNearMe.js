import {db} from '../../firebase/_firebase-config';
import {collection,getDocs} from "firebase/firestore";
import GetAllImagesInFolder from "./getAllImagesInFolder";
import GetImageInformation from "./getImageInformation";
import GetSingleImageFromServer from "./getSingleImageFromServer";

export default async function getAllImagesNearMe(){
    return new Promise(async (resolve, reject) => {
        // getting all the folder Names
        const imagesCollection = collection(db, 'images');
        let allDocuments = await getDocs(imagesCollection);
        let allDocsArr = [];

        allDocuments.forEach(doc => {
            allDocsArr.push(doc.id);
        });

        // getting all the images inside each folder
        let allImagesObj = new Map();
        for(let doc of allDocsArr){
            let allImages = await GetAllImagesInFolder(doc);
            if(allImages.status){
                allImagesObj.set(doc,allImages.payload.message);
            }
        }
        allDocsArr = undefined;
        // getting all of the valid image information
        // a valid image is one which is within a 2km range from the user
        let keys = allImagesObj.keys();
        let validImages = new Map();

        for(let key of keys){
            for(let image of allImagesObj.get(key)){
                image = image.stringValue;
                let imageInfo = await GetImageInformation(image,2);
                if(imageInfo.status){
                    let data = {
                        image:image,
                        data:imageInfo.payload,
                    }
                    if (validImages.has(key)) {
                      validImages.get(key).push(data);
                    } else {
                      validImages.set(key, [data]);
                    }
                }
            }
        }

        allImagesObj = undefined;
        let validKeys = validImages.keys();
        let temp = [];
        for (let key of validKeys) {
          for (let image of validImages.get(key)) {
            let imageReference = await GetSingleImageFromServer(key, image.image);
            if (imageReference.status) {
              image.image = imageReference.image;
              temp.push({
                  folderName:key,
                  image:image
              })
            }
          }

        }
        validImages = undefined;
        resolve(temp);
    })
}