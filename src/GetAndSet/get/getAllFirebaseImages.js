import {db} from '../../firebase/_firebase-config';
import {collection, getDocs} from "firebase/firestore";
export default function getAllFirebaseImages(){
    return new Promise((resolve, reject)=>{
        const collectionRef = collection(db, 'images');
        getDocs(collectionRef).then((snapshot)=>{
            let arr = [];
            snapshot.forEach((doc)=>{
                arr.push({
                    folderName:doc.id,
                    data:doc.data()
                });
            })
            resolve({
                status:true,
                payload:{
                    message:arr,
                },
            })
        })
    })
}