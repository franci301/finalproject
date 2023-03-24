import '../Assets/Styles/topComponent.css';
import 'react-history-search/dist/index.css';
import { useState,useEffect } from 'react';
import { Provider, History, Trigger } from 'react-history-search';
import GetAllImagesInFolder from "../GetAndSet/GetAllImagesInFolder";
import GetImagesFromFolder from "../GetAndSet/GetImagesFromFolder";

export default function TopComponent() {

    const [images,setImagesArr] = useState(null);
    async function handleSearch(value){
        //  need to add regex or something to ensure I only add the hyphen to the one space separating the two words
        value = value.replace(' ', '-');
        const result = await GetAllImagesInFolder(value);
        if(result.status){
            let imagesCollection = result.payload.message;
            const imagesArr = await GetImagesFromFolder(value,imagesCollection);
            setImagesArr(imagesArr.images);
        }else{
            console.log(result.payload.message)
        }
    }

    return (
        <div className="top d-flex flex-row">
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
            {images !== null?
                images.map((value,index)=>(
                  <img src={value}  key={index} style={{
                      width:'50%'
                  }}/>
                ))
                :
                <></>
            }
        </div>
    )
}
