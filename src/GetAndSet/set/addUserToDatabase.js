import { db } from '../../firebase/_firebase-config';
import {setDoc, doc, getDoc} from 'firebase/firestore';
/**
 * Function to add user details to the database
 * @param {string} email - User's email
 * @param {object} result - User's object
 */
export default async function AddUserToDatabase(email,result){
    const userCollectionRef = doc(db, 'users', result.user.uid);
    const imagesCollectionRef = doc(db, 'imagesRef', result.user.uid);
    const imagesDoc = await getDoc(imagesCollectionRef);

    if((await getDoc(imagesCollectionRef)).exists()){
        console.log('User already has an account');
    }else{
        await setDoc(imagesCollectionRef, {
            images:[],
        });
           const imagesDocRef = imagesDoc.ref.id;
            setDoc(userCollectionRef, {
                email: email,
                imagesDocumentRef: imagesDocRef,
            }).catch((error)=>{console.log(error)})
    }

}