import searchShortcut from "../Assets/image-processing/searchShortcut";
import GetAllImagesInFolder from "./get/getAllImagesInFolder";
import GetImagesFromServer from "./get/getImagesFromServer";
import GetImageInformation from "./get/getImageInformation";
/**
 * *
 * @param {string} value - the name of the folder/ colour which the user wishes to search for
 * @param {number} range - the search radius specified by the user (default = 2)
 */
export default async function lazySearch(value,range) {
    // get the object keys so I can iterate through them
    const colours = Object.keys(searchShortcut);
    let folderNameArray;

    for (let colour of colours) {
        // if it has a slash it means two "primary" colours have overlapping results
        if (colour.indexOf('/') !== -1) {
            let colourArr = colour.split('/');
            let [colour1, colour2] = colourArr;
            if (colour1 === value) {
                folderNameArray = (searchShortcut[colour]);
                break;
            } else if (colour2 === value) {
                folderNameArray = (searchShortcut[colour]);
                break;
            }
        } else {
            if (colour === value) {
                folderNameArray = (searchShortcut[colour]);
                break;
            }
        }
    }

    // create a map to keep track of the folder name and the images inside of it

    let imagesMap= new Map();

    for(let folderName of folderNameArray){
        let result = await GetAllImagesInFolder(folderName);
        if(result.status){
            imagesMap.set(folderName,result.payload.message)
        }
    }

    // undefine folderName to save on memory
    folderNameArray = undefined

    let allImages = [];
    const folderKeys = imagesMap.keys();

    // get all the images from the server
    for(let folderName of folderKeys){
        const result = await GetImagesFromServer(folderName,imagesMap.get(folderName))
        allImages.push(result.images);
    }

    let storeInformation = [];

    // here we get all the image information
    for(let imageName of allImages){
        for(let image of imageName){
            // image = http://localhost:3333/images/sky-blue/bridge-3cfa.png
            // so we split on the LAST '/' to get the image name
            let temp = image.split("/");
            let name = temp[temp.length - 1];
            const imageInfo = await GetImageInformation(name, range);
            if(imageInfo.status){
                let data ={folderName: temp[temp.length-2], image:{
                    data: imageInfo.payload, image:image
                }};
                storeInformation.push(data);
            }
        }
    }
    return storeInformation;
}