import searchShortcut from "../Assets/image-processing/searchShortcut";

export default function checkValidLazySearch(value){
    const colours = Object.keys(searchShortcut);
    for(let colour of colours){
        if(value === colour){
            return true;
        }
    }
    return false;
}