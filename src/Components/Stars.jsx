import star from '../Assets/Images/star.png';


export default function Stars({id}){
    return(
        <div>
            <img id={id} src={star} alt=""/>
        </div>
    )
}