import  Dropzone  from "react-dropzone";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import getLatLong from "../Assets/image-processing/getLatLong";
import NavMain from "../Layouts/NavMain";
import { Palette } from "color-thief-react";
import { GetColorName } from 'hex-color-to-color-name';
import { getColorName } from 'color-name'; // remember to uninstall this package
import nearestColor from 'nearest-color';
import colourNames from "../Assets/image-processing/colourNames";

import '../Assets/Styles/bottomComp.css'



export default function UploadImage() {

    const navigate = useNavigate();
    const [imageCoords, setImageCoords] = useState({ state: "initial" });
    const [imageURL,setImageURL] = useState(null);
    const [imageColors, setColors] = useState([]);
    // const [colourNames,setColourNames] = useState([]);

    useEffect(()=>{
        const nearest = nearestColor.from(colourNames);
        for(let hex of imageColors){
            const inputColor = hex;
            const closestColor = nearest(inputColor);
            // setColourNames(closestColor);
            console.log(closestColor);

        }
    },[imageColors])

    const handleDrop = async (acceptedFiles) => {
        setImageURL(URL.createObjectURL(acceptedFiles[0]));
        setImageCoords({ state: "loading" });
        try {
            const { latitude, longitude } = await getLatLong(acceptedFiles[0]);
            setImageCoords({ state: "resolved", latitude, longitude });
        } catch (error) {
            setImageCoords({ state: "rejected", error });
        }
    };


    function routeUploadPhoto(){
        const data = {latitude:imageCoords.latitude, longitude:imageCoords.longitude, colourNames:colourNames}
        navigate('/uploadPhoto',{state:data});
    }


    return (
        <div>
            <NavMain/>
            <Dropzone onDrop={handleDrop} >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag and drop some files here, or click to select files</p>
                        {imageCoords.state === "loading" && <p>Loading...</p>}
                        {imageCoords.state === "resolved" && (
                            <>
                                <p>Latitude: {imageCoords.latitude}</p>
                                <p>Longitude: {imageCoords.longitude}</p>
                            </>
                        )}
                        {imageCoords.state === "rejected" && (
                            <p>Error: {imageCoords.error.message}</p>
                        )}
                    </div>
                )}
            </Dropzone>
            {imageURL == null?
                <>Upload a photo by clicking on the text above! ^</>:
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
                                            <div className={'d-flex flex-row'}>
                                                <div key={index} style={{ backgroundColor: color }} id='example-pallet'>

                                                </div>
                                                {color}
                                                {/*{colourNames.map((name,index)=>(*/}
                                                {/*    <div key={index}>*/}
                                                {/*        {name}*/}
                                                {/*    </div>*/}
                                                {/*))}*/}
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }}
                    </Palette>
                </>
                }

            {/*<button onClick={routeUploadPhoto}>Upload Photo</button>*/}
        </div>
    );
}