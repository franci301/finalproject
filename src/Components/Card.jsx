import '../Assets/Styles/cardStyles.css'
import duck from '../Assets/Images/Homepage.jpeg'
import { useNavigate } from 'react-router-dom';
import CardDescription from './CardDescription';

function Card({name,rating,distance,keys,latLon}) {
    const listData = {name,rating,distance}
    const navigate = useNavigate();

    function routePage(){
        const data = {img: duck, latLon,rating,distance,name};
        navigate('/PopularPage', { state: data });
    }
    return (
        <div key={keys} id='card-container' className='d-flex justify-content-center flex-column'>
            <img src={duck} alt="Most Popular pic"  onClick={routePage}/>
            <CardDescription listData={listData}/>
        </div>
    )
}
export default Card;