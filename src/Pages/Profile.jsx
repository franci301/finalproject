import NavMain from '../Layouts/NavMain';
import temp from '../Assets/Images/profile.png'
import '../Assets/Styles/profile.css';

function Profile() {
    return (
        <div>
            <NavMain />
            <div className='d-flex flex-col'>
                <div id='profile-top'>
                    <img src={temp} alt="Profile Picture" />
                </div>
            </div>
        </div>
    )
}

export default Profile;