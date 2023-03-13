// store list of previous searches in local storage
// clear local storage on page close or logout

import '../Assets/Styles/topComponent.css';
import 'react-history-search/dist/index.css';
import { useState,useEffect } from 'react';
import { Provider, History, Trigger } from 'react-history-search';

function TopComponent() {
    // const [text, setText] = useState('');
    const [items,setItems] = useState(['aa']);

    useEffect(()=>{
        let history = localStorage.getItem('searchHistory');
        setItems(items);
    },[]);

    const handleSearch = (value) => {
        // alert(`Call some API to handle search keyword: ${value}`);
    };

    // function saveToLocal() {
    //     if (localStorage.getItem('searchHistory')) {
    //         let history = JSON.parse(localStorage.getItem('searchHistory'));
    //         let temp = [];
    //         if (history.length < 5) {
    //             for (let elm of history) {
    //                 temp.push(elm);
    //             }
    //             temp.push(text);
    //         } else {
    //             history.pop();
    //             history.push(text);
    //             temp = history;
    //         }
    //         localStorage.setItem('searchHistory', JSON.stringify(temp));
    //
    //     } else {
    //         let historyArray = [text, text];
    //         localStorage.setItem('searchHistory', JSON.stringify(historyArray));
    //     }
    // }

    return (
        <div className="top d-flex flex-row">
            <Provider value={{
                handleSearch,
                isEnterDown:true,
                limitHistory:3
            }}>
                <History isHint isTabFill isRemoveHistory>
                    <input type="text" name="" id="top-search" placeholder="Search for pictures"  />
                    {/*onChange={(event) => { setText(event.target.value) }}*/}
                </History>
                <Trigger dataId="top-search">
                    <button>Search</button>
                </Trigger>
                    {/*<button onClick={saveToLocal}>Search Icon</button>*/}
            </Provider>

            {/* need to create the popup thing which suggests search history */}
        </div>
    )
}

export default TopComponent;