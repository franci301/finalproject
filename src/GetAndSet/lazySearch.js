import searchShortcut from "../Assets/image-processing/searchShortcut";
import GetAllImagesInFolder from "./get/getAllImagesInFolder";
import GetImageInformation from "./get/getImageInformation";
import GetSingleImageFromServer from "./get/getSingleImageFromServer";
/**
 * *
 * @param {string} value - the name of the folder/ colour which the user wishes to search for
 * @param {number} range - the search radius specified by the user (default = 2)
 */
export default async function lazySearch(value,range) {
    // get the object keys so I can iterate through them
    console.log('lazy');
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

    const folderKeys = imagesMap.keys();

    let storeInformation = [];

    for(let folderName of folderKeys){
        for(let name of imagesMap.get(folderName)){
            const imageInfo = await GetImageInformation(name.stringValue, range);
            if(imageInfo.status){
                const result =  await GetSingleImageFromServer(folderName, name.stringValue);
                if(result.status){
                    let data = {
                        folderName: folderName,
                        image: {
                            data: imageInfo.payload,
                            image: result.image,
                        },
                    }
                    storeInformation.push(data);
                }
            }
        }
    }

    // clear the map to save some memory
    imagesMap.clear();
    imagesMap = undefined;

    return storeInformation;
}