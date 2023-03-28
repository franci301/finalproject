import Vibrant from "node-vibrant";
/**
 * @param {string} imageObject - Image object
 */
export default async function getProminantColour(imageObject){
    return new Promise((resolve, reject) =>{
        Vibrant.from(imageObject).getPalette((err, palette) => {
            if (err) {
                reject(err);
            }else{
                const {Vibrant} = palette;
                if(Vibrant){
                    resolve(Vibrant.hex);
                }
            }
        })
    })

}
