import '../Assets/Styles/LoginRegister.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { getAuth, signInWithRedirect, GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Cookies from 'js-cookie';
import NavMain from '../Layouts/NavMain';


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
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                Cookies.set('login-token', user.uid, { expires: 1 });
                navigate('/*');
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
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

    return (
        <>
            <NavMain />
            <div>
                Make register with google - change login to mobile version
                <div className='d-flex flex-col justify-content-center py-4'>
                    <div id='login-container'>
                        <div id='input1'>
                            <input type="text" placeholder="Email" onChange={(event) => { { setEmail(event.target.value) } }} />
                        </div>
                        <div id='input2'>
                            <input type="password" placeholder="Password" onChange={(event) => { { setPassword(event.target.value) } }} />
                        </div>
                        <div id='button-container'>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                        <div>
                            <button onClick={handleGoogleLogin}>Login with Google</button>
                        </div>
                        <div>
                            <button onClick={handleResetPassword}>Forgot Password?</button>
                        </div>
                        <div className='text-danger'>
                            {error}
                        </div>
                        <div id='register-container' >
                            <Link style={{textDecoration:'none', color:'black'}} to='/register'>REGISTER</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login;
