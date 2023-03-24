import '../Assets/Styles/bottomComp.css'
import Card from '../Components/Card'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth} from '../firebase/_firebase-config';

function BottomComp() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
            if(user) setLoggedIn(true);
        })
    },[])

    let popularItems = [{name:'Location 1',rating:5, distance:'2km'},{name:'Location 2',rating:4,distance:'5km'}]

    function routeUploadImages(){
        navigate('/uploadImage');
    }

    return (
        <div className='d-flex flex-column'>
            <div className={'d-flex flex-row pb-5'}>
                {popularItems.length !== 0 ?
                    popularItems.map((content, index) => (
                        <Card name={content.name} rating={content.rating} distance={content.distance} key={index} latLon={[51.52194, -0.04990]}/>
                    ))
                    :
                    <>nope</>
                }
            </div>
            {loggedIn?
                    <button onClick={routeUploadImages}>Upload Images</button>
                    :
                <>
                    Please login or create an account to upload a photo
                </>
            }
        </div>
    );

}
export default BottomComp;
