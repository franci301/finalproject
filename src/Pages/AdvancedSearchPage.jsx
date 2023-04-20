import NavMain from "../Layouts/NavMain";
import {useNavigate} from "react-router-dom";

export default function AdvancedSearchPage(){
    const navigate = useNavigate();

    return(
        <>
        <NavMain/>
            <div className={'d-flex flex-column p-4'}>
                <button onClick={()=> navigate('/advancedSearchNorm')}>
                    Compare Images Search
                </button>
                <br/>
                <button onClick={()=> navigate('/advancedSearchGrid')}>
                    Grid Search
                </button>
                <br/>
                <button onClick={()=> navigate('/percentageSearch')}>
                    Percentage Search
                </button>
            </div>
        </>
    )
}