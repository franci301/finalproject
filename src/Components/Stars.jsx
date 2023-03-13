import star from '../Assets/Images/star.jpg';


export default function Stars({id}){
    return(
        <div>
            <img id={id} src={star} alt=""/>
        </div>
    )
}