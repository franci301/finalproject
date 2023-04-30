import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../Assets/Styles/MapStyle.css';
import fetchImagesForBrowsing from "../GetAndSet/get/fetchImagesForBrowsing";


/**
 * Function displaying a map
 * Differs from MapPage as this page handles all the images
 */
export default function MapPageComplete(){
    // load the api key from env
       const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    if(!isLoaded) return (<div>Loading...</div>);
    return (
        <Map />
    )

}

function Map(){
    const [mapCentre, setLocation] = useState({});
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        // fetch user location from local storage
        let position = localStorage.getItem('user-location');
        position = position.split('/');
        setLocation({lat: parseFloat(position[0]), lng: parseFloat(position[1])});
        // fetch all the images in the database
        fetchImages().then((res)=>{
            setImages(res);
        }).catch((err)=>{
            console.log(err);
        })
        },[])

    async function fetchImages(){
         return await fetchImagesForBrowsing();
    }
    const containerStyle = {
        width: '100%',
        height: '100%',
    };
    const defaultMapOptions = {
        fullscreenControl: false,
        mapId: 'a6f0117f93054f4f',
        zoomControl: false,
        mapTypeControl: false
    };
    function handleIconClick(data){
        navigate('/viewIndividualImage',{state:data})
    }

     return (
        mapCentre.lat ?
            <GoogleMap zoom={14} center={mapCentre} mapContainerStyle={containerStyle} options={defaultMapOptions}>
                {/*MarkerF displays a marker indicating the users location*/}
                <MarkerF position={mapCentre}/>
                {images && images.length > 0 ?
                    images.map((value, index) => {
                        return (
                            // create a marker which contains an image
                            <MarkerF key={index} position={{lat:value.image.data.location[0].doubleValue, lng:value.image.data.location[1].doubleValue}} icon={{
                              url: value.image.image,
                              scaledSize: new window.google.maps.Size(50, 50)
                            }} onClick={(event) => handleIconClick(value)} />
                        );
                    })
                    :
                    null
                }
            </GoogleMap>
            :
            <div>Loading Map...</div>
    );
}