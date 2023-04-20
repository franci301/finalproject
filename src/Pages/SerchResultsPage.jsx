import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../Assets/Styles/topComponent.css';

/**
 * Function to display the search results
 * @param {props} information - list of data
 */
export default function SearchResultsPage({information}){

    const navigate = useNavigate()
    const [imagesArr, setImages] = useState(null);

    useEffect(()=>{
        setImages(information);
    },[information])

    function routeToMapPage(){
        const data = {images:imagesArr};
        navigate('/ViewOnMap',{state:data});
    }

    return(
        <>
          <div className={'d-flex flex-column align-content-center p-4'}>
            <div className={'d-flex flex-column results-images-container'}>
              {imagesArr !== null
                ? imagesArr.map((value, index) => {
                      return (
                        <div className="d-flex flex-row">
                          <img src={value.image.image} key={index} className={'p-2 w-50'} />
                        </div>
                      );
                  })
                : null}
            </div>
            <button onClick={routeToMapPage}>View all on map</button>
          </div>
        </>
    )
}
