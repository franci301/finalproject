import Dropzone from "react-dropzone";
import NavMain from "../Layouts/NavMain";
import {useState} from "react";
import processImage from "../Assets/image-processing/normaliseRGBValues";
import advancedSearch from "../GetAndSet/advancedSearch";
import {useNavigate} from "react-router-dom";
export default function AdvancedSearch(){
    const [rgbNorm, setRgbNorm] = useState(null);
    const navigate = useNavigate();
     const handleDrop = (e) => {
        const file = e[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = async () => {
                const norm = processImage(img);
                setRgbNorm(norm);
                const results = await advancedSearch(norm);
                if(results.length !== 0){
                    navigate('/advancedResults',{
                    state:{
                        results:results
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


    return(
        <>
            <NavMain/>
            <div>
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
        </>
    )
}