import NavMain from "../Layouts/NavMain";
import MapPage from "./MapPage";
import '../Assets/Styles/middleComp.css';
export default function ViewSearchMap(){
    return(
        <>
            <NavMain/>
            <div className='d-flex flex-column view-search-container p-4'>
                <h5>Map View</h5>
                <div style={{height:"70vh"}}>
                    <div className='middle-container'>
                        <MapPage/>
                    </div>
                </div>
            </div>
        </>
    )
}