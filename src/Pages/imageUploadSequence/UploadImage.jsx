import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import NavMain from "../../Layouts/NavMain";
import getLatLong from "../../Assets/image-processing/getLatLong";
import  Dropzone  from "react-dropzone";
import { Palette } from "color-thief-react";
import nearestColor from 'nearest-color';
import colourHex from "../../Assets/image-processing/colourNames";
import '../../Assets/Styles/bottomComp.css'

import { GetColorName } from 'hex-color-to-color-name';

export default function UploadImage() {

    const navigate = useNavigate();
    const [imageCoords, setImageCoords] = useState({ state: "initial" });
    const [imageURL, setImageURL] = useState(null);
    const [imageForNest, setImageFornest] = useState(null);
    const [imageObj, setImageObj] = useState(null);
    const [imageColors, setColors] = useState([]);
    const [colourNames, setColourNames] = useState([]);
    const [editableBoolean, setEditableBoolean] = useState(false);
    const [editableTxt, setEditableTxt] = useState('');
    const [noLocation, setNoLocation] = useState(false);

    useEffect(()=>{
        setColourNames([]);
        const nearest = nearestColor.from(colourHex);
        for(let hex of imageColors){
            const closestColor = nearest(hex);
            setColourNames(prevColourNames => [...prevColourNames, closestColor.name]);
        }
    },[imageColors,imageURL])

    const handleDrop = async (acceptedFiles) => {
        // need this format for Google Maps
        const imageObject = new Image();
        imageObject.src = URL.createObjectURL(acceptedFiles[0]);
        setImageObj(imageObject.src)
        // image url for extracting colour palette
        setImageURL(URL.createObjectURL(acceptedFiles[0]));
        setImageCoords({ state: "loading" });

        // image __ for backend
        setImageFornest(acceptedFiles[0]);

        try {
            const { latitude, longitude } = await getLatLong(acceptedFiles[0]);
            setImageCoords({ state: "resolved", latitude, longitude });
        } catch (error) {
            setNoLocation(true);
            navigator.geolocation.getCurrentPosition(function(position){
                setImageCoords({ state: "resolved", latitude:position.coords.latitude,longitude:position.coords.longitude });
            })
        }
    };

    function editTags(){
        setEditableTxt('Colour tags are now editable!')
        setEditableBoolean(true);
    }

    function getTagsValue(){
        const pTags = document.querySelectorAll('.colour-information p');
        const pValues = [];
        pTags.forEach(p => {
            pValues.push(p.innerText);
        });
        return pValues;
    }

    function routeUploadPhoto(){
        const data = {latitude:imageCoords.latitude, longitude:imageCoords.longitude, colourNames:colourNames}
        navigate('/uploadPhoto',{state:data});
    }

    function routeCheckImageCoords(){
        // set image colours to local storage and add function to be able to go back in the image upload sequence
        colours:getTagsValue()
        const data = {image:imageObj,latLong:imageCoords,locationAvailable:noLocation,nestImage:imageForNest};
        navigate('/verifyMap',{state:data});
    }



    return (

        <div >

            <NavMain/>

            <div id={'uploadPhotos-container'} className={'p-4'}>

            {imageURL == null?
                <p>Upload a photo by clicking on the text below!</p>:
                <>
                    <Palette src={imageURL} crossOrigin="anonymous" format="hex" colorCount={4}>
                        {({ data, loading }) => {
                            if (loading) return <>Loading</>;
                            setColors(data);
                            return (
                                <div>
                                    Palette:
                                    <ul>
                                        {data.map((color, index) => (
                                            <div className={'d-flex flex-row'} key={index}>
                                                <div  style={{ backgroundColor: color }} className='example-pallet'>
                                                </div>
                                                <div className={'d-flex flex-row px-3 align-items-center colour-information'}>
                                                    {/*<p>{color}</p>*/}
                                                    <p contentEditable={editableBoolean}>{colourNames[index]}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }}
                    </Palette>
                </>
                }
                <Dropzone onDrop={handleDrop} >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {imageURL === null?
                                <p>Click to analyse photos</p>:
                                <p>Upload a different photo</p>
                            }
                            {imageCoords.state === "loading" && <p>Loading...</p>}
                        </div>
                    )}
                </Dropzone>
                <div>
                    {imageURL === null?
                   null
                        :
                        <div>
                            <h5>Is the generate colour palette correct?</h5>
                            <div className={'d-flex flex-row justify-content-evenly'}>
                                <button onClick={routeCheckImageCoords}>Yes</button>
                                <button onClick={editTags}>No</button>
                            </div>
                            <br/>
                            {editableTxt.length !== 0?
                                <div className={'d-flex flex-column'}>
                                    {editableTxt}
                                    <button onClick={routeCheckImageCoords}>Save Changes</button>
                                </div>:
                                null}
                        </div>
                    }
                </div>
            </div>
            {/*<button onClick={routeUploadPhoto}>Upload Photo</button>*/}
        </div>
    );
}