import {useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import {useEffect, useMemo, useState} from 'react';
import img from '../Assets/Images/duck.jpg'
import '../Assets/Styles/MapStyle.css';
import {useLocation} from "react-router-dom";


export default function  MapPage(){
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    if(!isLoaded) return (<div>Loading...</div>);
    return (
        <Map/>
    )
}
function Map(){
    const [mapCentre, setLocation] = useState({});
    const [images, setImages] = useState([]);
    const stateVars = useLocation();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({lat: position.coords.latitude, lng: position.coords.longitude});
        });
        if (stateVars.state) {
            setImages(stateVars.state.images);
        }
    }, [stateVars.state]);

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

    function log() {
        console.log('here');
    }
    return (
        mapCentre.lat ?
            <GoogleMap zoom={14} center={mapCentre} mapContainerStyle={containerStyle} options={defaultMapOptions}>
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
            </GoogleMap>
            :
            <div>Loading Map...</div>
    );


}
