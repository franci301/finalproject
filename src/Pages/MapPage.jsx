import {useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import {useMemo} from 'react';
import img from '../Assets/Images/duck.jpg'
import '../Assets/Styles/MapStyle.css';


export default function MapPage(){
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    if(!isLoaded) return (<div>Loading...</div>);
    return (
            <Map/>
    )
}

function Map(){
    const center = useMemo(()=>({lat:51.52194, lng:-0.03904 }),[]);
    const center2 = useMemo(()=>({lat:51.52194, lng:-0.04990 }),[]);
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

    function log(){
        window.alert('yes');
    }
    return(
        <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle} options={defaultMapOptions}
        >
            {/*display markers and directions*/}
            <MarkerF position={center} icon={{
                url:img,
                scaledSize: new window.google.maps.Size(50,50),
                onClick:{log}
            }}/>
            <MarkerF position={center2} icon={{
                url:img,
                scaledSize: new window.google.maps.Size(50,50)
            }}/>
        </GoogleMap>
    )
}