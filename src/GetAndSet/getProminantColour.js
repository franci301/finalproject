import Vibrant from "node-vibrant";

export default async function getProminantColour(imageObject){
    return new Promise((resolve, reject) =>{
        Vibrant.from(imageObject).getPalette((err, palette) => {
            if (err) {
                reject(err);
            }else{
                const {Vibrant} = palette;
                resolve(Vibrant.hex);
            }
        })
    })

}
