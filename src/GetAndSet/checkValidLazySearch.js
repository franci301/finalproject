import searchShortcut from "../Assets/image-processing/searchShortcut";

/**
 * Function to check if the user input is a lazy search
 * @param {string} value - search word
 */
export default function checkValidLazySearch(value){
    // Loop through a list of colours and see if the user input exists as a key.
    // if it does then the input is a lazy search
    const colours = Object.keys(searchShortcut);
    for(let colour of colours){
        if(value === colour){
            return true;
        }
    }
    return false;
}