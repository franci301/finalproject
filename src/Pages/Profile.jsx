import NavMain from '../Layouts/NavMain';
import temp from '../Assets/Images/profile.png'
import '../Assets/Styles/profile.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import getUserDetails from '../GetAndSet/get/getUserDetails';
import getUserImages from "../GetAndSet/get/getUserImages";
import fetchAllImages from '../GetAndSet/get/fetchAllImages';
function Profile() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [images, setImages] = useState(null);


    useEffect(()=>{
       getUserDetails().then((res)=>{
           const {name,email} = res;
           if(name){
               setName(name);
           }
           setEmail(email);
       })
        getUserImages().then((res)=>{
            const {status, payload} = res;
            if(status){
                fetchAllImages(payload.message).then((res)=>{
                    if(res.status){
                        setImages(res.images);
                    }else{
                        console.log('An error has occurred')
                    }
                })
            }else{
                console.log('An error has occurred');
            }
        }).catch((err)=>{
                console.log(err);
        })
    },[])


    function routeEdit(){
        navigate('/editProfile');
    }

    function route(props){
        const data = {props}
        navigate('/viewIndividualImage', { state: data })
    }

    return (
        <div>
            <NavMain />
            <div className='d-flex flex-column '>
                <div id='profile-top' className='d-flex flex-column align-items-center'>
                        <img src={temp} alt="Profile Picture" />
                        {name && name.length >0?
                            <h6>{name}</h6>:
                            null
                        }
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
                    <div id={'profile-list-images'} className={'d-flex flex-wrap p-2'}>
                        {images !== null?
                            images.map((value,index)=>(
                              <img src={value} key={index}/>
                            ))
                            :
                            <></>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;