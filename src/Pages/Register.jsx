import '../Assets/Styles/LoginRegister.css';
import { useState } from 'react';
import { db, auth } from '../firebase/_firebase-config.js';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';
import NavMain from '../Layouts/NavMain';
import AddUserToDatabase from "../firebase/AddUserToDatabase";

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function register() {
        setError('');
        if (name === '') {
            setError('Please enter a Name');
        } else {
            if (email === email2 && email !== '') {
                if (password === password2 && password !== '') {
                    await createUserWithEmailAndPassword(auth, email, password).then((result) => {
                        AddUserToDatabase(name,email,result);
                        Cookies.set('login-token', result.user.uid, { expires: 1 });
                        navigate('/*');
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
    }

    async function registerWithGoogle() {
        setError('');

        if (name === '') {
            setError('Please enter a Name');
        } else {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            provider.setCustomParameters({ prompt: 'select_account' });

            signInWithPopup(auth, provider)
                .then((result) => {
                    // const credential = GoogleAuthProvider.credentialFromResult(result);
                    // const token = credential.accessToken;
                    AddUserToDatabase(name,result.user.email,result);
                    Cookies.set('login-token', result.user.uid, { expires: 1 });
                    navigate('/*');
                }).catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    // const credential = GoogleAuthProvider.credentialFromError(error);
                    setError(errorMessage);
                })

        }




    }

    return (
        <>
            <NavMain />
            <div className='d-flex flex-column justify-content-center py-4'>
                <div>
                    <input type="text" placeholder="Full Name" onChange={(event) => { { setName(event.target.value) } }} />
                </div>
                <div>
                    <input type="text" placeholder='Email' onChange={(event) => { { setEmail(event.target.value) } }} />
                    <input type="text" placeholder='Repeat Email' onChange={(event) => { { setEmail2(event.target.value) } }} />
                </div>
                <div>
                    <input type="password" placeholder="Password" onChange={(event) => { { setPassword(event.target.value) } }} />
                    <input type="password" placeholder="Repeat Password" onChange={(event) => { { setPassword2(event.target.value) } }} />
                </div>
                <div>
                    <button onClick={register}>Register</button>
                    <button onClick={registerWithGoogle}>Register With Google</button>
                    <h6 className='text-danger'>
                        {error}
                    </h6>
                </div>
            </div>
        </>
    )
}
export default Register;