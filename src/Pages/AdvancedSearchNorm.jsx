import Dropzone from "react-dropzone";
import NavMain from "../Layouts/NavMain";
import {useState} from "react";
import processImage from "../Assets/image-processing/normaliseRGBValues";
import advancedSearch from "../GetAndSet/advancedSearch";
import {useNavigate} from "react-router-dom";
import {Slider} from "@mui/material";

export default function AdvancedSearchNorm(){

    const [rgbNorm, setRgbNorm] = useState(null);
    const [range, setValue] = useState(2);
    const navigate = useNavigate();

     // function to handle the user uploading an image to the system
     const handleDrop = (e) => {
        const file = e[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = async () => {
                // function to process an image into a normalized form
                const norm = processImage(img);
                setRgbNorm(norm);
                const results = await advancedSearch(norm,range);
                if(results.length !== 0){
                    navigate('/advancedResults',{
                    state:{
                        result:results
                    }
                    });
                }else{
                    console.log('No similar images');
                }
            };
          };
          reader.readAsDataURL(file);
        }
      }

       const handleChange = ( event,newValue) => {
        setValue(newValue);
      };


    return(
        <>
            <NavMain/>
            <div className='d-flex p-4'>
            <Dropzone onDrop={handleDrop} >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {rgbNorm === null?
                                <p>Click to compare photos</p>:
                                <p>Search with a different photo</p>
                            }
                        </div>
                    )}
                </Dropzone>
            </div>
            <div className={'d-flex flex-column p-4'}>
                <p>Search radius (km):</p>
                <br/>
                <Slider
                  aria-label="Temperature"
                  defaultValue={2}
                  valueLabelDisplay="on"
                  onChange={handleChange}
                  step={2}
                  marks
                  min={2}
                  max={14}
                  getAriaValueText={value => `${value} km`}
                />
            </div>
        </>
    )
}