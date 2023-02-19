import '../Assets/Styles/LoginRegister.css';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../firebase/firebase-config';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import Cookies from 'js-cookie';
import NavMain from '../Layouts/NavMain';


function Login() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(){
        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth,email,password).then((user) =>{
                Cookies.set('login-token', user.user.uid, { expires: 1 });
                navigate('/*');
            }).catch((error) =>{
                switch(error.code){
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
        }else{
            setError('Please enter an email and password');
        }
    }
    return (
        <>
        <NavMain/>
            <div className='d-flex flex-col justify-content-center py-4'>
                <div>
                    <input type="text" placeholder="Email" onChange={(event) =>{{setEmail(event.target.value)}}}/>
                </div>
                <div>
                    <input type="password" placeholder="Password" onChange={(event) =>{{setPassword(event.target.value)}}}/>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className='text-danger'>
                {error}
            </div>
            <div>
                <Link to='/register'>REGISTER</Link>
            </div>
        </>
    )

}
export default Login;
