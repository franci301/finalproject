import {useLocation} from "react-router-dom";
import NavMain from "../Layouts/NavMain";
import SingleImgMap from "../Components/SingleImgMap";
import Stars from "../Components/Stars";
import '../Assets/Styles/Homepage.css'

// Function to display the most popular image, rating and its location
export default function PopularPage(){

    const location = useLocation();
    const {img,latLon,rating,distance,name} = location.state;
    const components = Array.from({ length: rating }, (_, i) => <Stars key={i} />);

    return(
        <div>
            <NavMain/>
            <div className='d-flex flex-column p-4 align-items-center' id='popular-container'>
                <div>
                    <h2> {name} </h2>
                </div>
                <img src={img} alt=""/>
                <div id='popular-description-container'>
                    <div className='d-flex flex-row'>
                        {components}
                    </div>
                    <h5>Distance: {distance}</h5>
                </div>
                <div id='single-map-container'>
                    <SingleImgMap latLon={latLon} img={img} editable={false}/>
                </div>
            </div>
        </div>
    );
}
