import NavMain from "../Layouts/NavMain";
import {useState} from "react";
import {History, Provider, Trigger} from "react-history-search";
import {Slider} from "@mui/material";
import SearchResultsPage from "./SerchResultsPage";
import lazySearch from "../GetAndSet/lazySearch";
import '../Assets/Styles/topComponent.css';
import 'react-history-search/dist/index.css';
import basicSearch from "../GetAndSet/basicSearch";
import checkValidLazySearch from "../GetAndSet/checkValidLazySearch";

/**
 * Page allows users to search for images based on colour names
 */
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

        // Reformat the user input to be lowercacse and replace any spaces between words with '-' to match database naming convention
        value = value.toLowerCase();
        value = value.replace(/\s(?=\S)/g, "-");

        // verify if the user search is a lazy search
        const validLazy = checkValidLazySearch(value);

        if(validLazy){
            const data = await lazySearch(value,range);
            setInfo(data)
        }else{
            const result = await basicSearch(value,range);
            if(result.status){
                setInfo(result.message);
            }else{
                setErr(result.message);
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
