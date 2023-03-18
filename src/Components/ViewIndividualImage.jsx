import NavMain from "../Layouts/NavMain";
import {useLocation} from "react-router-dom";

export default function ViewIndividualImage(){

    const location = useLocation();
    const {image} = location.state;





    return(
        <div>
            <NavMain/>
            <img src={image} alt="Image"/>
        </div>
    )
}