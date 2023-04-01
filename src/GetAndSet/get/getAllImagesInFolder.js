import {db} from '../../firebase/_firebase-config';
import {doc, getDoc, collection} from "firebase/firestore";

/**
 * @param {string} folderName - The dominant color of the image
 */
export default async function GetAllImagesInFolder(folderName){
    return new Promise((resolve, reject)=>{
        const imageRef = collection(db,'images');
        const docRef = doc(imageRef, folderName);
        getDoc(docRef).then((res)=>{
            if(res.exists()){
                resolve({
                    status: true,
                    payload:{
                        message:res._document.data.value.mapValue.fields.images.arrayValue.values,
                    },
                })
            }else{
                resolve({
                    status:false,
                    payload:{
                        message:'No images have been uploaded under this tag.',
                    },
                })
            }
        }).catch((err)=>{
            resolve({
                status:false,
                payload:{
                    message:err,
                },
            })
        })
    })
}