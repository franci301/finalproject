import NavMain from '../Layouts/NavMain';
import temp from '../Assets/Images/profile.png'
import '../Assets/Styles/profile.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import getUserDetails from '../firebase/getUserDetails.js';

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const tempArr =[
        {image:temp},
        {image:temp},
        {image:temp},
        {image:temp}
    ];

    useEffect(()=>{
       getUserDetails().then((res)=>{
           const {name,email} = res;
           setName(name);
           setEmail(email);
       })
    },[])



    function routeEdit(){
        navigate('/editProfile');
    }

    function route(props){
        const data = {image:props.image}
        navigate('/viewIndividualImage', { state: data })
    }
    return (
        <div>
            <NavMain />
            <div className='d-flex flex-column '>
                <div id='profile-top' className='d-flex flex-column align-items-center'>
                        <img src={temp} alt="Profile Picture" />
                        <h6>{name}</h6>
                        <h6>{email}</h6>
                    <div>
                        <button onClick={routeEdit}>Edit Profile</button>
                    </div>
                    <div id={'profile-stats-container'} className={'d-flex flex-row justify-content-center'}>
                        <div>
                            <p>Likes:</p>
                        </div>
                        <div>
                            <p>Followers:</p>
                        </div>
                    </div>
                    <div id={'profile-list-images'} className={'d-flex flex-wrap'}>
                        {tempArr.length !== 0?
                            tempArr.map((value,index)=>(
                              <img src={temp} onClick={()=>route(value)} key={index}/>
                            ))
                            :
                            <>Upload an image to see it here!</>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;