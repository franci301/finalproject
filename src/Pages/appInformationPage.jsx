import NavMain from "../Layouts/NavMain";
import {useNavigate} from "react-router-dom";

export default function AppInformationPage(){

    const navigate = useNavigate();

    function routeSearchInfo(){
        navigate('/searchInformation')
    }

    function routePaletteInfo(){
        navigate('/paletteInformation')
    }
    return (
        <>
        <NavMain/>
        <div>
            <h2>App Information</h2>
            <br/>
            <div className={'d-flex flex-column p-4'}>
                <button onClick={routeSearchInfo}>How to search</button>
                <br/>
                <button onClick={routePaletteInfo}>General Palette Information</button>
            </div>

        </div>
        </>
    );
}