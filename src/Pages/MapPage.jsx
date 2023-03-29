import {useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import {useEffect, useState} from 'react';
import '../Assets/Styles/MapStyle.css';
import {useLocation, useNavigate} from "react-router-dom";
import getAllImagesNearMe from "../GetAndSet/getAllImagesNearMe";


export default function  MapPage(){
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
    const [localImages, setLocalImages] = useState([]);
    const stateVars = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let position = localStorage.getItem('user-location');
        position = position.split('/');
        setLocation({lat: parseFloat(position[0]), lng: parseFloat(position[1])});
        if (stateVars.state) {
            setImages(stateVars.state.images);
        }else if(['http://localhost:3000/*','http://localhost:3000/'].includes(window.location.href)){
            handleFetchAllImagesNearMe().then((res)=>{
                setLocalImages(res);
            }).catch((err) =>{
                console.log(err);
            })
        }
    }, [stateVars.state]);

    async function handleFetchAllImagesNearMe(){
        return await getAllImagesNearMe();
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
                <MarkerF position={mapCentre}/>
                {images && images.length > 0 ?
                    images.map((value, index) => {
                        return (
                            <MarkerF key={index} position={{lat:value.imageInfo.location[0].doubleValue, lng:value.imageInfo.location[1].doubleValue}} icon={{
                              url: value.image,
                              scaledSize: new window.google.maps.Size(50, 50)
                            }} />
                        );
                    })
                    :
                    null
                }
                {localImages && localImages.length>0?
                    localImages.map((value, index) => {
                        return (
                            <MarkerF key={index} position={{lat:value.image.data.location[0].doubleValue, lng:value.image.data.location[1].doubleValue}} icon={{
                              url: value.image.image,
                              scaledSize: new window.google.maps.Size(50, 50)
                            }} onClick={(event) => handleIconClick(value)}/>
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
