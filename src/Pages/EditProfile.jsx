import '../Assets/Styles/profile.css';
import NavMain from '../Layouts/NavMain';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function EditProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            if(user){
                getUserInformation();
            }else{
                console.log('Not Signed In');
            }
        })
    }, []);

    async function getUserInformation() {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            await getDoc(userDocRef).then((doc) => {
                if (doc.exists()) {
                    setName(doc.data().name);
                    setEmail(doc.data().email);
                } else {    
                    console.log('No such document!');
                }
            }).catch((error) => {
                console.log('Error getting document:', error);
            });
        }
    }

    async function updateInformation() {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                name: name,
                email: email
            }).then(() => {
                console.log('Document successfully updated!');
            }).catch((error) => {
                // The document probably doesn't exist.
                console.error('Error updating document: ', error);
            });
        }   
    }

    async function handleSendPasswordReset() {
        await sendPasswordResetEmail(auth, email).then((result) => {
            window.alert('Password Reset Email Has Been Sent!')
        }).catch((err) => {
            window.alert('Error sending email')
            switch (err.message) {
                case 'auth/invalid-email':
                    window.alert('Invalid Email');
                    break;
                case 'auth/user-not-found':
                    window.alert('User not found');
                    break;
                default:
                    window.alert('Something went wrong \nPlease try again');
                    // remove for production
                    console.log(err.message);
            }
        })
    }
    return (
        <div id='edit-container' className='d-flex flex-column'>
            <NavMain />
            <div className='d-flex flex-column pt-3 px-3'>
                <div className='pb-3' id='edit-input-container'>
                    <h1> Name:</h1>
                    <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
                    <h1> Email: </h1>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <h1 onClick={handleSendPasswordReset} id='reset-h1'>Change Password</h1>
                </div>
                <button onClick={updateInformation}>Update Information</button>
            </div>
        </div>

    )
}