import {auth, db} from '../firebase/_firebase-config';
import {doc, getDoc, collection} from 'firebase/firestore';

export default async function getUserImages(){
    return new Promise((resolve, reject)=>{
        const userImages = auth.onAuthStateChanged(function(user){
            if(user){
                const imageRef = collection(db, 'imagesRef');
                const docRef = doc(imageRef, user.uid);
                getDoc(docRef).then((res)=>{
                    if(res){
                        userImages();
                        resolve({
                            status:true,
                            payload:{
                                message:res._document.data.value.mapValue.fields.images.arrayValue.values,
                            },
                        });
                    }else{
                        userImages();
                        reject({
                            status:false,
                            payload:{
                                message:'No document found',
                            },
                        })
                    }
                }).catch((err)=>{
                    userImages();
                    reject({
                        status:false,
                        payload:{
                            message:err,
                        },
                    })
                })
            }
        })
    })
}