import NavMain from "../Layouts/NavMain";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../Assets/Styles/topComponent.css';
export default function SearchResultsPage(){

    const location = useLocation();
    const navigate = useNavigate()
    const [imagesArr, setImages] = useState(null);

    useEffect(()=>{
        setImages(location.state.data);
    },[location])

    function routeMap(){
        const data = {images:imagesArr};
        navigate('/ViewOnMap',{state:data});
    }

    return(
        <>
            <NavMain/>
            <div className={'d-flex flex-column align-content-center p-4'}>
                <h3>Search Results are shown here</h3>
                <div className={'d-flex flex-row results-images-container'}>
                    {imagesArr !== null?
                            imagesArr.map((value,index)=>(
                                <img src={value.image}  key={index} className={'p-2'}/>
                            ))
                            :
                            <></>
                        }
                </div>
                <button onClick={routeMap}>View all on map </button>
            </div>
        </>
    )
}