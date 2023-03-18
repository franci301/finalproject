import NavMain from "../Layouts/NavMain";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function UploadPhotoPage(){
    const location = useLocation();
    const [latLong,setLatLong] = useState([0,0]);

    useEffect(()=>{
        const {latitude,longitude} = location.state;
        setLatLong([latitude,longitude]);
    },[location.state])

    return(
        <>
            <NavMain/>
            <div className={'d-flex flex-column justify-content-center'}>
                <p>Upload Images to the server/database</p>
                <p>Latitude:{latLong[0]}</p>
                <p>Longitude:{latLong[1]}</p>
            </div>
        </>
    )
}