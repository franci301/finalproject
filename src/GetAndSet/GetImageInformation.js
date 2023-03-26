import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/_firebase-config";

export default async function GetImageInformation(imageName){
    return new Promise(async (resolve, reject) => {
        const imageRef = collection(db, 'imageInformation');
        const docRef = doc(imageRef, imageName);
        await getDoc(docRef).then((res) => {
            if (res) {
                const data = res._document.data.value.mapValue.fields;
                resolve({
                    status: true,
                    payload: {
                        location: data.coords.arrayValue.values,
                        colours: data.palette.arrayValue.values,
                    },
                })
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