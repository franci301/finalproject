import '../Assets/Styles/cardStyles.css'
import duck from '../Assets/Images/duck.jpg'
import { useNavigate } from 'react-router-dom';

function Card({state,keys}) {
    // const route = useNavigate();

    return (
        <div key={keys} id='card-container' className='d-flex justify-content-center'>
            {state}
            <img src={duck} alt="Most Popular pic" />
        </div>
    )
}
export default Card;