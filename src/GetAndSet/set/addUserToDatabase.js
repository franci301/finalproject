import { db } from '../../firebase/_firebase-config';
import {setDoc, doc, getDoc} from 'firebase/firestore';
/**
 * @param {string} email - User's email
 * @param {object} result - User's object
 */
export default async function AddUserToDatabase(email,result){
    const userCollectionRef = doc(db, 'users', result.user.uid);
    const imagesCollectionRef = doc(db, 'imagesRef', result.user.uid);

    await setDoc(imagesCollectionRef, {
        images:[],
    });

    const imagesDoc = await getDoc(imagesCollectionRef);
    const imagesDocRef = imagesDoc.ref.id;

    setDoc(userCollectionRef, {
        email: email,
        imagesDocumentRef: imagesDocRef,
    }).catch((error)=>{console.log(error)})
}