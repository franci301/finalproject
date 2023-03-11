import NavMain from '../Layouts/NavMain';
import temp from '../Assets/Images/profile.png'
import '../Assets/Styles/profile.css';
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    function routeEdit(){
        navigate('/editProfile');
    }

    return (
        <div>
            <NavMain />
            <div className='d-flex flex-column'>
                <div id='profile-top' className='d-flex flex-column'>
                    <img src={temp} alt="Profile Picture" />
                    <div>
                        <button onClick={routeEdit}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;