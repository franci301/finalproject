import {auth,db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export default async function getUserDetails(){
    return new Promise((resolve, reject) => {
        const userInformation = auth.onAuthStateChanged(function(user) {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef).then(function(doc) {
                    if (doc.exists()) {
                        const userData = doc.data();
                        userInformation();
                        resolve(userData);
                    } else {
                        userInformation();
                        reject(new Error('No user data found'));
                    }
                }).catch(function(error) {
                    userInformation();
                    reject(error);
                });
            } else {
                userInformation();
                reject(new Error('No user currently signed in'));
            }
        });
    });
}
