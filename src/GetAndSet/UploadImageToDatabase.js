import {auth, db} from '../firebase/_firebase-config';
import {doc, setDoc, arrayUnion, getDoc, collection, updateDoc} from "firebase/firestore";

    /**
     * @param {string} folderName - The dominant color of the image
     * @param {number} fileName - The name of the image
     */
    // SOLUTION:
    // make a function which will check to see if the folder has been created
    // if it has return true and we can append
    // if it hasnt then create it and then return true
    export default async function UploadImageToDatabase(folderName, fileName){
    return new Promise((resolve, reject)=>{
        const userDetails = auth.onAuthStateChanged(function(user){
            if(user){
                getDoc(doc(collection(db,'images'),folderName)).then((res)=>{
                    console.log(res.exists());
                    const imageRef = collection(db, 'images');
                    const docRef = doc(imageRef,folderName)
                    if(res.exists()){
                        updateDoc(docRef,{
                            images:arrayUnion(fileName)
                        })
                    }else{
                        setDoc(docRef, {
                              images: [fileName]
                            });
                    }
                })
                    setDoc(doc(db,'images',folderName),{
                        images:arrayUnion(...[fileName])
                    }).then(()=>{
                        userDetails();
                        resolve({
                            status:true,
                            message:'Image uploaded successfully to database',
                        })
                    })
                .catch((err)=>{
                    userDetails();
                    resolve({
                        status:false,
                        message:'Something went wrong',
                        error:err,
                    })
                });
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


// import {auth, db} from '../firebase/_firebase-config';
// import {doc, updateDoc, setDoc, getDoc, arrayUnion, collection} from "firebase/firestore";
//
// /**
//  * @param {string} folderName - The dominant color of the image
//  * @param {number} fileName - The name of the image
//  */
// export default async function UploadImageToDatabase(folderName, fileName){
//     return new Promise((resolve, reject)=>{
//         const userDetails = auth.onAuthStateChanged(function(user){
//             if(user){
//                 const imageRef = collection(db,'images')
//                 const docRef = doc(imageRef,folderName);
//                 getDoc(docRef)
//                 .then((doc) => {
//                     console.log(doc);
//                     console.log(doc.exists());
//                     if (!doc.exists()) {
//                         const docRef = doc(imageRef,folderName);
//                         setDoc(docRef, { images: [fileName] });
//                     } else {
//                         updateDoc(docRef, {
//                             images: arrayUnion(fileName)
//                         });
//                     }
//                     userDetails();
//                     resolve({
//                         status:true,
//                         message:'Image uploaded successfully to database',
//                     })
//                 })
//                 .catch((err)=>{
//                     userDetails();
//                     resolve({
//                         status:false,
//                         message:'Something went wrong',
//                         error:err,
//                     })
//                 });
//             }else{
//                 userDetails();
//                 reject({
//                     status:false,
//                     message:'No user found',
//                 })
//             }
//         })
//     })
// }

