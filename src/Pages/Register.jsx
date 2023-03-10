import '../Assets/Styles/LoginRegister.css';
import { useState } from 'react';
import {db,auth} from '../firebase/firebase-config.js';
import {setDoc, doc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import NavMain from '../Layouts/NavMain';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    async function register() {
        setError('');
        if(name === ''){
            setError('Please enter a Name');
        }else{
            if (email === email2 && email !== '') {
                if (password === password2 && password !== '') {
                    const user = await createUserWithEmailAndPassword(auth,email,password);
                    const userCollectionRef = doc(db,'users',user.user.uid);
                    await setDoc(userCollectionRef,{
                        name:name, email:email
                    });
                } else {
                    setError('Passwords do not match');
                }
            } else {
                setError('Emails do not match');
            }
        }
    }

    return (
        <>
        <NavMain/>
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
                    <h1 className='text-danger'>
                        {error}
                    </h1>
                </div>
            </div>
        </>
    )
}
export default Register;