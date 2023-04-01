import NavMain from "../Layouts/NavMain";
import {useState} from "react";
import {History, Provider, Trigger} from "react-history-search";
import {Slider} from "@mui/material";
import SearchResultsPage from "./SerchResultsPage";
import GetAllImagesInFolder from "../GetAndSet/get/getAllImagesInFolder";
import GetImagesFromFolder from "../GetAndSet/get/getImagesFromFolder";
import GetImageInformation from "../GetAndSet/get/getImageInformation";
import lazySearch from "../GetAndSet/lazySearch";
import '../Assets/Styles/topComponent.css';
import 'react-history-search/dist/index.css';

export default function SearchPage(){

    const [info, setInfo] = useState([]);
    const [range, setValue] = useState(2);
    const [err, setErr] = useState('');

      const handleChange = ( event,newValue) => {
        setValue(newValue);
      };


    async function handleSearch(value) {
        setInfo([]);
        setErr('');
        value = value.toLowerCase();
        value = value.replace(/\s(?=\S)/g, "-");
        //  get all the image references inside the folder
        const result = await GetAllImagesInFolder(value)
        if (result.status) {
          let imagesCollection = result.payload.message;
          //  get the actual image object
          const imagesArr = await GetImagesFromFolder(value, imagesCollection);
          if (imagesArr.status) {
            let storeInformation = [];
            for (let imageName of imagesArr.images) {
              let temp = imageName.split("/");
              let name = temp[temp.length - 1];
                // image = http://localhost:3333/images/sky-blue/bridge-3cfa.png
                // so we split on the LAST '/' to get the image name
              const imageInfo = await GetImageInformation(name, range);
              if (imageInfo.status) {
                let data = { folderName: value, image: {
                    data: imageInfo.payload,
                        image: imageName,
                }};
                console.log(data)
                storeInformation.push(data);
              }else{
                  setErr('Some images havent been displayed as they are outside of your search radius, try expanding it to see more images');
              }
            }
            setInfo(storeInformation);
          } else {
            console.log("Something went wrong");
          }
        } else {
              console.log(result.payload.message);
              if(result.payload.message.toString().includes("No images have been uploaded under this tag.")){
                  console.log('here')
                  const data = await lazySearch(value,range);
                  console.log(data)
                  setInfo(data)
              }else{
                console.log('No images under this name');
                }
        }
    }

    return(
        <div>
            <NavMain/>
            <div className='top d-flex flex-row p-4'>
                <Provider value={{
                    handleSearch,
                    isEnterDown:true,
                    limitHistory:3
                }}>
                    <History isHint isTabFill isRemoveHistory>
                        <input type="text" name="" id="top-search" placeholder="Search for pictures"  />
                    </History>
                    <Trigger dataId="top-search">
                        <button>Search</button>
                    </Trigger>
                </Provider>
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
            <div className={'p-4'}>
                {err}
            </div>
            {info && info.length >0?
                <SearchResultsPage information={info}/>:
                null
            }

        </div>
    )
}
