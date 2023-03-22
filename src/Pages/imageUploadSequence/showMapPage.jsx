import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import NavMain from "../../Layouts/NavMain";
import SingleImgMap from "../../Components/SingleImgMap";
import UploadFileNameToDatabase from "../../firebase/UploadFileNameToDatabase";

export default function ShowMapPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [imageObj, setImage] = useState(null);
    const [imageCoords, setLatLong] = useState({state: 'initial'});
    const [errorText, setErrorText] = useState('');
    const [postcode, setPostcode] = useState('');
    const [locationBool, setLocationBool] = useState(false);
    const [editable,setEditabale] = useState(false);
    const [nestImage,setImageForNest] = useState(null);
    const [dominantColour, setDominantColour] = useState('');

    useEffect(() => {
        setImage(location.state.image);
        setLatLong({
            state: 'resolved',
            latitude: location.state.latLong.latitude,
            longitude: location.state.latLong.longitude
        });
        setLocationBool(location.state.locationAvailable);
        setImageForNest(location.state.nestImage);
        setDominantColour(location.state.dominantColor);
    }, [location]);

    function showNoText() {
        setErrorText('Drag the image to the correct location or enter the postcode in the box below.\n Be aware that currently, the postcode feature only works for the UK');
        setEditabale(true);
    }

    function handleMarkerDrag(lat, lng) {
        setLatLong({state: 'resolved', latitude: lat, longitude: lng});
    }

    async function getPostCode() {
        setErrorText('');
        console.log(!(postcode.length === 0));
        if(!(postcode.length === 0)){
            const url = `https://api.postcodes.io/postcodes/${postcode}`;
            await fetch(url)
                .then(response => response.json())
                .then(data => setLatLong({
                    state: 'resolved',
                    latitude: data.result.latitude,
                    longitude: data.result.longitude
                }))
                .catch(error => setErrorText(error));
        }else{
            setErrorText('Postcode cannot be empty')
        }
    }

    async function uploadImage(){

        const formData = new FormData();
        formData.append('folderName', dominantColour);
        formData.append('file', nestImage);

        try{
            const response = await fetch('http://localhost:3333/images',{
                method: 'POST',
                body: formData,
            });
            await response.json().then((res)=>{
                if(res.success === true){
                    handleDatabaseUpload(dominantColour + '/'+ res.payload.fileName);
                }else{
                    setErrorText('Something went wrong, please try again. \n If the issue persists, contact customer support.');
                }
            })
        }catch(error){
            console.log(error);
        }
    }

    async function handleDatabaseUpload(fileName){
        const outcome =  await UploadFileNameToDatabase(fileName);
        if(outcome.status === true){
            console.log(outcome.message);
            navigate('/profile');

        }else{
            console.log(outcome.message)
        }
    }

    return (
        <>
            <NavMain/>
            <div className={'px-4'}>
                {imageCoords.state === "resolved" && (
                    <div id='single-map-container'>
                        <SingleImgMap latLon={[imageCoords.latitude, imageCoords.longitude]} img={imageObj}
                                      editable={editable} onMarkerDrag={handleMarkerDrag}/>
                        <br/>
                        <h5>Is the location shown correct?</h5>
                        <div className={'d-flex flex-row justify-content-evenly'}>
                            <button onClick={uploadImage}>Yes</button>
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
                        <button onClick={uploadImage}>Submit Photo</button>
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
