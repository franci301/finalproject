import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/_firebase-config";

export default async function UploadInformationToDatabase(name,coords,colours,normValues,histValues,histBlock){
    return new Promise((resolve, reject)=>{
        const imageCollectionRef = collection(db,'imageInformation');
        const docRef = doc(imageCollectionRef,name);
        const obj = Object.fromEntries(histValues);
        const objList = histBlock.map((map) => Object.fromEntries(map));
        setDoc(docRef,{
            coords:[coords.latitude,coords.longitude],
            palette: colours,
            normValues: normValues,
            histValues:obj,
            histBlock: objList,
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