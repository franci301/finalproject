import Card from '../Components/Card'
import {useNavigate} from "react-router-dom";
import '../Assets/Styles/bottomComp.css'

function BottomComp() {
    const navigate = useNavigate();
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
            <button onClick={routeUploadImages}>Upload Images</button>
        </div>
    );

}
export default BottomComp;
