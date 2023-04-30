import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import NavMain from "../../Layouts/NavMain";
import getLatLong from "../../GetAndSet/get/getLatLong";
import  Dropzone  from "react-dropzone";
import { Palette } from "color-thief-react";
import nearestColor from 'nearest-color';
import colourHex from "../../Assets/image-processing/colourNamesExhaustive";
import '../../Assets/Styles/bottomComp.css'
import getProminantColour from "../../GetAndSet/get/getProminantColour";
import processImageNormalise from "../../Assets/image-processing/normaliseRGBValues";
import processImage from "../../Assets/image-processing/processImage";
import {sumHistogram} from "../../Assets/image-processing/colourPercentages";
import removeTotalSize from "../../Assets/image-processing/removeTotalSize";

/**
 *  Function to handle uploading an image
 */
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
    const [normValues, setNormalizedValues] = useState(null);
    const [histValues, setHistogramValues] = useState(null);
    const [histBlock, setHistBlockValues] = useState(null);

    useEffect(()=>{
        setColourNames([]);
        const nearest = nearestColor.from(colourHex);
        for(let hex of imageColors){
            const closestColor = nearest(hex); // calculate the nearest colour from the given hex value and list
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
        // image for backend
        setImageFornest(acceptedFiles[0]);
        const file = acceptedFiles[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let values = processImage(img); // create histogram
                setHistogramValues(sumHistogram(values));
                values = removeTotalSize(values);
                setHistBlockValues(values);
                const normValues = processImageNormalise(img); // normalise an image
              setNormalizedValues(normValues);
            };
          };
          reader.readAsDataURL(file);
        }
        // Dominant colour palette
        const nearest = nearestColor.from(colourHex)
        // find the prominent colour from the image
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
            const { latitude, longitude } = await getLatLong(acceptedFiles[0]); // get location of photo
            setImageCoords({ state: "resolved", latitude, longitude });
        } catch (error) {
            setNoLocation(true);
            let position = localStorage.getItem('user-location'); // if no location exists, set the user location as the image location
            position = position.split('/');
            setImageCoords({ state: "resolved", latitude:parseFloat(position[0]),longitude:parseFloat(position[1]) })
        }
    };

    function editTags(){
        setEditableTxt('Colour tags are now editable!');
        setEditableBoolean(true);
    }


    function routeCheckImageCoords(){
        const data = {
            image:imageObj,
            latLong:imageCoords,
            locationAvailable:noLocation,
            nestImage:imageForNest,
            dominantColor: dominantColourName === null? colourNames[0]:dominantColourName ,
            colourNames: colourNames,
            normalizedValues: normValues,
            histogramValues:histValues,
            histBlock: histBlock,
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
                            if(data !== undefined) setColors(data);
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
                            <h5>Is the generated colour palette correct?</h5>
                            <div className={'d-flex flex-row justify-content-evenly'}>
                                <>{imageCoords.state === 'resolved' && normValues !== null?
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