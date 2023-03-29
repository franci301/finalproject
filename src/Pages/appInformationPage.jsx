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
            <div className={'d-flex flex-column p-4'}>
                <h2>App Information</h2>
                <br/>
                <p>Edit some settings to get the most out of your application</p>
                <h5>Iphone Users:</h5>
                <ul>
                    <li>Navigate to Settings</li>
                    <li>Camera</li>
                    <li>Formats</li>
                    <li>Select "Most Compatible"</li>
                    <li>This ensures that the location data about the image is stored and will not be deleted upon upload to the application</li>
                </ul>
                <button onClick={routeSearchInfo}>How to search</button>
                <br/>
                <button onClick={routePaletteInfo}>General Palette Information</button>
            </div>
        </div>
        </>
    );
}