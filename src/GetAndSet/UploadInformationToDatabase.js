import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase/_firebase-config";

export default async function UploadInformationToDatabase(name,coords,colours){
    return new Promise((resolve, reject)=>{
        const imageCollectionRef = collection(db,'imageInformation');
        const docRef = doc(imageCollectionRef,name);
        setDoc(docRef,{
            coords:[coords.latitude,coords.longitude],
            palette: colours,
        }).then(()=>{
            resolve({
                status:true,
                message:'Image uploaded successfully to image information',
            })
        }).catch((err)=>{
            reject({
                status:false,
                message:'Something went wrong\n'+err,
            })
        })
    })
}