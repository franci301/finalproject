import NavMain from "../Layouts/NavMain";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from 'react';
import colourNamesExhaustive from "../Assets/image-processing/colourNamesExhaustive";


export default function ViewIndividualImage(){

    const location = useLocation();
    const[folderName, setFolderName] = useState('');
    const [image, setImage] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [colours, setColours] = useState(null);
    const [colourPalette, setColourPalette] = useState([])


    useEffect(()=>{
        setFolderName(location.state.folderName.replace('-',' '));
        setImage(location.state.image.image);
        const userAgent = window.navigator.userAgent;
        if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)){
            setLiveLink(`"comgooglemaps://?q=${location.state.image.data.location[0].doubleValue},${location.state.image.data.location[1].doubleValue}`);
        }else if(userAgent.match(/Android/i)){
            setLiveLink(`geo:${location.state.image.data.location[0].doubleValue},${location.state.image.data.location[1].doubleValue}`);
        }else{
            setLiveLink(`https://www.google.com/maps/search/?api=1&query=${location.state.image.data.location[0].doubleValue},${location.state.image.data.location[1].doubleValue}`);
        }

        setColours(location.state.image.data.colours);
        let arr = [];
        for(let colour of location.state.image.data.colours){
            arr.push(colourNamesExhaustive[colour.stringValue]);
        }
        setColourPalette(arr);
    },[location])

    const colorItemStyle = {
        flexBasis: '50%',
        boxSizing: 'border-box',
        padding: '4px',
      };

    const colorContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
      };

    return(
        <div>
            <NavMain/>
            <div className={'d-flex flex-column p-4 align-items-center'}>
                <h5>{folderName}</h5>
                <img src={image} alt="Image" style={{width:'100%'}}/>
                <div>
                    <br/>
                    <h5>Colour Palette</h5>
                    <div className={'d-flex flex-column'}>
                        <ul style={colorContainerStyle}>
                            {colours && colours.length > 0 ?
                                colours.map((res, index) => {
                                  return (
                                      <li style={colorItemStyle} key={index}>
                                          <div className={'d-flex flex-row'}>
                                              <div className={'example-pallet'} style={{backgroundColor:colourPalette[index]}}>
                                              </div>
                                              <div className={'d-flex flex-row px-3 align-items-center colour-information'}>
                                                  <p> {colours[index].stringValue}</p>
                                              </div>
                                          </div>
                                      </li>
                                  );
                                }) :
                                null
                              }
                        </ul>
                    </div>
                    <a href={liveLink} target="_blank">Open location in Google Maps</a>
                </div>
            </div>
        </div>
    )
}