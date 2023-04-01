import {auth, db} from '../../firebase/_firebase-config';
import {doc, setDoc, arrayUnion, getDoc, collection, updateDoc} from "firebase/firestore";

/**
 * @param {string} folderName - The dominant color of the image
 * @param {number} fileName - The name of the image
 */
export default async function UploadImageToDatabase(folderName, fileName){
    return new Promise((resolve, reject)=>{
        auth.onAuthStateChanged(function(user){
            if(user){
                const imageRef = collection(db,'images')
                const docRef = doc(imageRef,folderName);
                getDoc(docRef)
                .then((doc) => {
                    if (!doc.exists()) {
                        setDoc(docRef, { images: [fileName] });
                    } else {
                        updateDoc(docRef, {
                            images: arrayUnion(fileName)
                        });
                    }
                    resolve({
                        status:true,
                        message:'Image uploaded successfully to database',
                    })
                })
                .catch((err)=>{
                    resolve({
                        status:false,
                        message:'Something went wrong',
                        error:err,
                    })
                });
            }else{
                reject({
                    status:false,
                    message:'No user found',
                })
            }
        })
    })
}