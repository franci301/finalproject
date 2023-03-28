import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import NavMain from "../../Layouts/NavMain";
import getLatLong from "../../GetAndSet/getLatLong";
import  Dropzone  from "react-dropzone";
import { Palette } from "color-thief-react";
import nearestColor from 'nearest-color';
import colourHex from "../../Assets/image-processing/colourNamesExhaustive";
import '../../Assets/Styles/bottomComp.css'
import getProminantColour from "../../GetAndSet/getProminantColour";

export default function UploadImage() {

    const navigate = useNavigate();
    const [imageCoords, setImageCoords] = useState({ state: "initial" });
    const [imageURL, setImageURL] = useState(null);
    const [imageForNest, setImageFornest] = useState(null);
    const [imageObj, setImageObj] = useState(null);
    const [imageColors, setColors] = useState([]);
    const [colourNames, setColourNames] = useState([]);
    const [dominantColourName, setDominantColourName] = useState(null);
    const [hex, setHex] = useState(null);
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

    /**
     * @param {file} acceptedFiles - Image selected by the user
     */
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
        // Dominant colour palette
        const nearest = nearestColor.from(colourHex);

        getProminantColour(imageObject.src).then((res)=>{
            if(res){
                setHex(res);
                const dominantColourName = nearest(res).name;
                setDominantColourName(dominantColourName);
            }

        }).catch((err)=>{
            console.log(err);
        })

        try {
            const { latitude, longitude } = await getLatLong(acceptedFiles[0]);
            setImageCoords({ state: "resolved", latitude, longitude });
        } catch (error) {
            setNoLocation(true);
            let position = localStorage.getItem('user-location');
            position = position.split('/');
            setImageCoords({ state: "resolved", latitude:parseFloat(position[0]),longitude:parseFloat(position[1]) })
        }
    };

    function editTags(){
        setEditableTxt('Colour tags are now editable!');
        setEditableBoolean(true);
    }


    function routeCheckImageCoords(){
        // set image colours to local storage and add function to be able to go back in the image upload sequence

        const data = {
            image:imageObj,
            latLong:imageCoords,
            locationAvailable:noLocation,
            nestImage:imageForNest,
            dominantColor: dominantColourName === null? colourNames[0]:dominantColourName ,
            colourNames: colourNames,
        };
        navigate('/verifyMap',{state:data});
    }

      const colorContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
      };

      const colorItemStyle = {
        flexBasis: '50%',
        boxSizing: 'border-box',
        padding: '4px',
      };


    return (

        <div >

            <NavMain/>

            <div id={'uploadPhotos-container'} className={'p-4'}>

            {imageURL == null?
                <p>Upload a photo by clicking on the text below!</p>:
                <>
                    <Palette src={imageURL} crossOrigin="anonymous" format="hex" colorCount={8}>
                        {({ data, loading }) => {
                            if (loading) return <>Loading</>;
                            setColors(data);
                            return (
                                <div>
                                    Palette:
                                        <ul style={colorContainerStyle}>
                                          {data.map((color, index) => (
                                            <li style={colorItemStyle} key={index}>
                                              <div className="d-flex flex-row">
                                                <div
                                                  style={{ backgroundColor: color }}
                                                  className="example-pallet"
                                                ></div>
                                                <div className="d-flex flex-row px-3 align-items-center colour-information">
                                                  <p contentEditable={editableBoolean}>{colourNames[index]}</p>
                                                </div>
                                              </div>
                                            </li>
                                          ))}
                                        </ul>
                                    {dominantColourName === null?
                                        <>
                                        </>:
                                        <div>
                                            Dominant Colour:
                                            <br/>
                                            (Note this may not be the colour that appears the most, but actually the most vibrant colour)
                                            <div style={{backgroundColor:hex}} className='example-pallet'>
                                            </div>
                                        </div>
                                    }
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
                                <>{imageCoords.state === 'resolved'?
                                    <button onClick={routeCheckImageCoords}>Yes</button>
                                        :
                                        <></>
                                }
                                <button onClick={editTags}>No</button>
                                </>
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
        </div>
    );
}