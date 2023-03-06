import '../Assets/Styles/cardStyles.css'
import duck from '../Assets/Images/Homepage.jpeg'
import { useNavigate } from 'react-router-dom';
import CardDescription from './CardDescription';

function Card({name,rating,distance,keys}) {
    // const route = useNavigate();
    const listData = {name,rating,distance}
    return (
        <div key={keys} id='card-container' className='d-flex justify-content-center flex-column'>
            <img src={duck} alt="Most Popular pic" />
            <CardDescription listData={listData}/>
        </div>
    )
}
export default Card;