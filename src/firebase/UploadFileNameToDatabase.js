import {auth, db} from './_firebase-config';
import {doc,collection, updateDoc, arrayUnion} from "firebase/firestore";

export default async function UploadFileNameToDatabase(imageName,folderName){
    return new Promise((resolve, reject) =>{
        const userDetails = auth.onAuthStateChanged(function(user){
            if(user){
                const imageCollectionRef = collection(db, 'imagesRef');
                const docRef = doc(imageCollectionRef,user.uid);
                updateDoc(docRef,{
                    images:arrayUnion(...[imageName])
                }).then((res)=>{
                    userDetails();
                    resolve({
                        status:true,
                        message:'Image uploaded successfully',
                    })
                }).catch((error)=>{
                    userDetails();
                    resolve({
                        status:false,
                        message:'Something went wrong',
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