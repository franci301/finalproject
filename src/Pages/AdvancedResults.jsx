import NavMain from "../Layouts/NavMain";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function AdvancedResults(){

    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(()=>{
        setData(location.state.results);
    },[location.state])

    return(
        <>
            <NavMain/>
            <div>
                {data && data.length >0 ?
                    data.map((value,index)=>{
                        return(
                            <div className='d-flex flex-row'>
                                <img key={index} src={value.image} alt="" className={'p-2 w-50'}/>
                            </div>
                        )
                    }):
                    null
                }
            </div>
        </>
    )
}