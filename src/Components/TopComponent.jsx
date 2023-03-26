import '../Assets/Styles/topComponent.css';
import 'react-history-search/dist/index.css';
import { Provider, History, Trigger } from 'react-history-search';
import GetAllImagesInFolder from "../GetAndSet/GetAllImagesInFolder";
import GetImagesFromFolder from "../GetAndSet/GetImagesFromFolder";
import {useNavigate} from "react-router-dom";
import GetImageInformation from "../GetAndSet/GetImageInformation";

export default function TopComponent() {

    const navigate = useNavigate();

    async function handleSearch(value){
        //  need to add regex or something to ensure I only add the hyphen to the one space separating the two words
        value = value.replace(' ', '-');
        const result = await GetAllImagesInFolder(value);
        if(result.status){
            let imagesCollection = result.payload.message;
            const imagesArr = await GetImagesFromFolder(value,imagesCollection);
            if(imagesArr.status){
                let storeInformation = [];
                for(let imageName of imagesArr.images){
                    let temp = imageName.split('/');
                    let name = temp[temp.length-1];
                    const imageInfo = await GetImageInformation(name);
                    let data = {imageInfo:imageInfo.payload,image:imageName};
                    storeInformation.push(data);
                }
                navigate('/searchResults',{
                    state:{
                        data:storeInformation,
                    }
                });
            }else{
                console.log('Something went wrong');
            }
        }else{
            console.log(result.payload.message);
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
        </div>
    )
}
