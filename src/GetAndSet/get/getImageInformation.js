import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/_firebase-config";
import CalculateValidDistance from "../calculateValidDistance";
/**
 * *
 * @param {string} imageName - name of the image
 * @param {number} range - the search radius specified by the user (default = 2)
 */
export default async function GetImageInformation(imageName, range){
    return new Promise(async (resolve, reject) => {
        const imageRef = collection(db, 'imageInformation');
        const docRef = doc(imageRef, imageName);
        await getDoc(docRef).then((res) => {
            if (res) {
                const data = res._document.data.value.mapValue.fields;
                //  check if coords are within user distance
                const valid = CalculateValidDistance(range,data.coords.arrayValue.values[0].doubleValue,data.coords.arrayValue.values[1].doubleValue,51.5218501,-0.0390126);
                if(valid){
                    resolve({
                        status: true,
                        payload: {
                            location: data.coords.arrayValue.values,
                            colours: data.palette.arrayValue.values,
                            normValues: data.normValues,
                            histBlock: data.histBlock,
                        },
                    })
                }else{
                    resolve({
                        status:false,
                        payload:{
                            message:'There are locations outside of your search radius, try expanding to see them'
                        }
                    })
                }
            } else {
                reject({
                    status: false,
                    payload: {
                        message: 'No information about this image has been found',
                    }
                })
            }
        }).catch((err) => {
            reject({
                status: false,
                payload: {
                    message: err,
                }
            })
        })
    })
}