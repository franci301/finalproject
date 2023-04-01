import '../Assets/Styles/LoginRegister.css';
import { useState } from 'react';
import {auth, db} from '../firebase/_firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';
import NavMain from '../Layouts/NavMain';
import AddUserToDatabase from "../GetAndSet/set/addUserToDatabase";
import {collection, doc, getDoc} from "firebase/firestore";

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    async function register() {
        setError('');
        if (email !== '') {
            if (password === password2 && password !== '') {
                await createUserWithEmailAndPassword(auth, email, password).then((result) => {
                    AddUserToDatabase(email,result);
                    Cookies.set('login-token', result.user.uid, { expires: 1 });
                    navigate('/appInformation');
                }).catch((err) => {
                    switch (err.code) {
                        case 'auth/email-already-in-use':
                            setError('Email already in use');
                            break;
                        case 'auth/invalid-email':
                            setError('Invalid Email');
                            break;
                        case 'auth/operation-not-allowed':
                            setError('Operation not allowed');
                            break;
                        case 'auth/weak-password':
                            setError('Weak Password');
                            break;
                        default:
                            setError('Something went wrong \nPlease try again');
                            // remove for production
                            console.log(err.code);
                    }
                })
            } else {
                setError('Passwords do not match');
            }
        } else {
            setError('Emails do not match');
        }
    }

    function registerWithGoogle() {
        setError('');
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const {user} = result;
                const collectionRef = await collection(db, 'users');
                const docRef = await doc(collectionRef, user.uid);
                const res = await getDoc(docRef);
                if (res.exists) {
                    setError('An account with this email already exists. Click the Login icon on the top right to login with Google')
                }else{
                    // const credential = GoogleAuthProvider.credentialFromResult(result);
                    // const token = credential.accessToken;
                    await AddUserToDatabase(result.user.email, result);
                    Cookies.set('login-token', result.user.uid, {expires: 1});
                    navigate('/*');
                }
            }).catch((error) => {
                console.log(error);
                // const errorCode = error.code;
                const errorMessage = error.message;
                // const credential = GoogleAuthProvider.credentialFromError(error);
                setError(errorMessage);
            })
    }

    return (
        <>
            <NavMain />
            <div className='d-flex flex-column justify-content-center align-items-center p-4'>
                <div id={'register-text'} className={'py-3'}>
                    <h2>Join our community today!</h2>
                </div>
                <div className={'register-container'}>
                    <div id={'email-input'}>
                        <input type="text" placeholder='Email' onChange={(event) => { { setEmail(event.target.value) } }} />
                    </div>
                    <div id={'pswd-input'}>
                        <input type="password" placeholder="Password" onChange={(event) => { { setPassword(event.target.value) } }} />
                    </div>
                    <div id={'pswd-input2'}>
                        <input type="password" placeholder="Repeat Password" onChange={(event) => { { setPassword2(event.target.value) } }} />
                    </div>
                    <div id={'register-button'} className={'d-flex justify-content-center'}>
                        <button onClick={register}>Register</button>
                    </div>
                     <div className="horizontal-line-with-text">
                          <div className="line start"></div>
                          <div className="text">Continue with</div>
                          <div className="line end"></div>
                    </div>
                    <button onClick={registerWithGoogle}>Register With Google</button>
                    <div className={'error-container d-flex align-items-center justify-content-center'}>
                        <h5 className='text-danger'>
                            {error}
                        </h5>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;