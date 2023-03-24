import {db} from '../firebase/_firebase-config';
import {doc, getDoc, collection} from "firebase/firestore";

export default async function GetAllImagesInFolder(folderName){
    return new Promise((resolve, reject)=>{
        const imageRef = collection(db,'images');
        const docRef = doc(imageRef, folderName);
        getDoc(docRef).then((res)=>{
            if(res){
                resolve({
                    status: true,
                    payload:{
                        message:res._document.data.value.mapValue.fields.images.arrayValue.values,
                    },
                })
            }else{
                reject({
                    status:false,
                    payload:{
                        message:'No images have been uploaded under this tag.',
                    },
                })
            }
        }).catch((err)=>{
            reject({
                status:false,
                payload:{
                    message:err,
                },
            })
        })
    })
}