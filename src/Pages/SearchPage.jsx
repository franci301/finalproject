import NavMain from "../Layouts/NavMain";
import {useState} from "react";
import {History, Provider, Trigger} from "react-history-search";
import {Slider} from "@mui/material";
import SearchResultsPage from "./SerchResultsPage";
import GetAllImagesInFolder from "../GetAndSet/GetAllImagesInFolder";
import GetImagesFromFolder from "../GetAndSet/GetImagesFromFolder";
import GetImageInformation from "../GetAndSet/GetImageInformation";
import lazySearch from "../GetAndSet/lazySearch";
import '../Assets/Styles/topComponent.css';
import 'react-history-search/dist/index.css';

export default function SearchPage(){

    const [info, setInfo] = useState([]);
    const [range, setValue] = useState(2);

      const handleChange = ( event,newValue) => {
        setValue(newValue);
      };
    //  need to refactor this











    async function handleSearch(value) {
      setInfo([]);
      value = value.toLowerCase();
      value = value.replace(/\s(?=\S)/g, "-");
    //  get all of the image references inside the folder
    const result = await GetAllImagesInFolder(value);
    if (result.status) {
      let imagesCollection = result.payload.message;
      console.log(imagesCollection);
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
            let data = { imageInfo: imageInfo.payload, image: imageName };
            storeInformation.push(data);
          }
        }
        setInfo(storeInformation);
      } else {
        console.log("Something went wrong");
      }
    } else {
      console.log(result.payload.message);
      if(result.payload.message.toString().includes("TypeError: Cannot read properties of null (reading 'data')")){
              const data = await lazySearch(value,range);
              setInfo(data)
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
            <div className='d-flex flex-column p-4'>
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
            {info && info.length >0?
                <SearchResultsPage information={info}/>:
                null
            }
        </div>
    )
}
