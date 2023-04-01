import '../Assets/Styles/LoginRegister.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/_firebase-config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Cookies from 'js-cookie';
import NavMain from '../Layouts/NavMain';
import AddUserToDatabase from "../GetAndSet/set/addUserToDatabase";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.setCustomParameters({ prompt: 'select_account' });

        signInWithPopup(auth, provider)
            .then(async (result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                await AddUserToDatabase(result.user.email, result);
                Cookies.set('login-token', user.uid, {expires: 1});
                navigate('/*');
            }).catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                // const credential = GoogleAuthProvider.credentialFromError(error);
                setError(errorMessage);
            })
    }

    async function handleLogin() {
        if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password).then((user) => {
                Cookies.set('login-token', user.user.uid, { expires: 1 });
                navigate('/*');
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setError('Invalid Email');
                        break;
                    case 'auth/user-disabled':
                        setError('User Disabled');
                        break;
                    case 'auth/user-not-found':
                        setError('User Not Found');
                        break;
                    case 'auth/wrong-password':
                        setError('Wrong Password');
                        break;
                    default:
                        setError('Something went wrong \nPlease try again');
                        console.log(error.message);
                }
            })
        } else {
            setError('Please enter an email and password');
        }
    }

    async function handleResetPassword() {
        if (email !== '') {
            await sendPasswordResetEmail(auth, email).then(() => {
                setError('Password reset email sent');
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setError('Invalid Email');
                        break;
                    case 'auth/user-not-found':
                        setError('User Not Found');
                        break;
                    default:
                        setError('Something went wrong \nPlease try again');
                        console.log(error.message);
                }
            })
        } else {
            setError('Please enter an email');
        }
    }

    function routeRegister(){
        navigate('/register')
    }

    return (
        <>
            <NavMain />
            <div className='d-flex flex-column justify-content-center align-items-center p-4'>
                <div id={'login-text'} className={'py-3'}>
                    <h2>Welcome back!</h2>
                </div>
                <div className='login-container'>
                    <div id='input1'>
                        <input type="text" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                    </div>
                    <div id='input2'>
                        <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div className={'d-flex flex-row'} id='options-button-container'>
                        <button id={'login-button'} onClick={handleLogin}>Login</button>
                        <button onClick={routeRegister}>Register</button>
                    </div>
                     <div id={'reset-password'}>
                        <p onClick={handleResetPassword}>Reset Password</p>
                    </div>
                    <div className="horizontal-line-with-text">
                          <div className="line start"></div>
                          <div className="text">Login with</div>
                          <div className="line end"></div>
                    </div>
                    <div>
                        <button onClick={handleGoogleLogin}>Google</button>
                    </div>
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
export default Login;
