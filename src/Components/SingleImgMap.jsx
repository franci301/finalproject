import {useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import {useMemo} from 'react';
import '../Assets/Images/duck.jpg'
import '../Assets/Styles/MapStyle.css';

export default function SingleImgMap({latLon,img}){
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    if(!isLoaded) return (<div>Loading...</div>);
    return (
        <Map latLon={latLon} img={img}/>
    )
}

function Map({latLon, img}){
    const center = useMemo(()=>({lat:latLon[0],lng:latLon[1]}),[latLon]);

    const containerStyle = {
        width: '100%',
        height: '100%',
    };
    const defaultMapOptions = {
        fullscreenControl: false,
        mapId: 'a6f0117f93054f4f',
        zoomControl:false,
        mapTypeControl:false
    };
    return(
        <GoogleMap zoom={13} center={center} mapContainerStyle={containerStyle} options={defaultMapOptions}>
            <MarkerF position={center} icon={{
                url:img,
                scaledSize: new window.google.maps.Size(50,50)
            }}/>
        </GoogleMap>
    )
}