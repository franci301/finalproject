import '../Assets/Styles/cardStyles.css'
import { useNavigate } from 'react-router-dom';
import CardDescription from './CardDescription';

function Card({name,rating,distance,keys,latLon, image,index}) {
    const listData = {name,rating,distance}
    const navigate = useNavigate();

    function routePage(){
        const data = {img: image, latLon,rating,distance,name};
        navigate('/PopularPage', { state: data });
    }
    return (
        <div key={keys} id='card-container' className='d-flex justify-content-center flex-column'>
            <img src={image} alt="Most Popular pic"  onClick={routePage} id={'card'+index}/>
            <CardDescription listData={listData}/>
        </div>
    )
}
export default Card;