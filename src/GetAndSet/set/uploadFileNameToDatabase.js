import {auth, db} from '../../firebase/_firebase-config';
import {doc,collection, updateDoc, arrayUnion} from "firebase/firestore";

/**
 * @param {string} imageName - The name of the image and folder {folderName}/{image}
 */
export default async function UploadFileNameToDatabase(imageName){
    return new Promise((resolve, reject) =>{
        const userDetails = auth.onAuthStateChanged(function(user){
            if(user){
                const imageCollectionRef = collection(db, 'imagesRef');
                const docRef = doc(imageCollectionRef,user.uid);
                updateDoc(docRef,{
                    images:arrayUnion(...[imageName])
                }).then(()=>{
                    userDetails();
                    resolve({
                        status:true,
                        message:'Image uploaded successfully to user information',
                    })
                }).catch((err)=>{
                    userDetails();
                    resolve({
                        status:false,
                        message:'Something went wrong\n'+err,
                    })
                })
            }else{
                userDetails();
                reject({
                    status:false,
                    message:'No user found',
                })
            }
        })
    })
}