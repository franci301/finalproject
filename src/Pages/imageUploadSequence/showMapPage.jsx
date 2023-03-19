import {useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import NavMain from "../../Layouts/NavMain";
import SingleImgMap from "../../Components/SingleImgMap";

export default function ShowMapPage() {

    const location = useLocation();

    const [imageObj, setImage] = useState(null);
    const [imageCoords, setLatLong] = useState({state: 'initial'});
    const [errorText, setErrorText] = useState('');
    const [postcode, setPostcode] = useState('');
    const [locationBool, setLocationBool] = useState(false);


    useEffect(() => {
        setImage(location.state.image);
        setLatLong({
            state: 'resolved',
            latitude: location.state.latLong.latitude,
            longitude: location.state.latLong.longitude
        });
        setLocationBool(location.state.locationAvailable);
    }, [location]);

    function showNoText() {
        setErrorText('Drag the image to the correct location or enter the postcode in the box below.\n Be aware that currently, the postcode feature only works for the UK');
    }

    function handleMarkerDrag(lat, lng) {
        setLatLong({state: 'resolved', latitude: lat, longitude: lng});
    }

    async function getPostCode() {
        const url = `https://api.postcodes.io/postcodes/${postcode}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => setLatLong({
                state: 'resolved',
                latitude: data.result.latitude,
                longitude: data.result.longitude
            }))
            .catch(error => console.error(error))
    }

    return (
        <>
            <NavMain/>
            <div className={'px-4'}>
                {imageCoords.state === "resolved" && (
                    <div id='single-map-container'>
                        <SingleImgMap latLon={[imageCoords.latitude, imageCoords.longitude]} img={imageObj}
                                      editable={true} onMarkerDrag={handleMarkerDrag}/>
                        <br/>
                        <h5>Is the location shown correct?</h5>
                        <div className={'d-flex flex-row justify-content-evenly'}>
                            <button>Yes</button>
                            <button onClick={showNoText}>No</button>
                        </div>
                        <div className={'d-flex flex-column py-3'}>
                            {errorText}
                            {errorText.length !== 0 ?
                                <>
                                    <input type="text" id={'postCodeInput'}
                                           onChange={(event) => (setPostcode(event.target.value))}/>
                                    <button onClick={getPostCode}>Check Postcode</button>
                                </>
                                :
                                <></>
                            }

                        </div>
                        <button>Submit Photo</button>
                        <br/>
                        {locationBool === true && (
                            <>
                                <p>Error: No location information for the image was found</p>
                            </>
                        )}
                    </div>

                )}


            </div>
        </>
    )
}
