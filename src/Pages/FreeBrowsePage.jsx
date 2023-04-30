import '../Assets/Styles/middleComp.css';
import NavMain from "../Layouts/NavMain";
import MapPageComplete from "./MapPageComplete";
/**
 *  Function to display the map with every image
 */
export default function FreeBrowsePage(){
    return(
        <>
        <NavMain/>
            <div className={'browse-map-container p-2'}>
                <MapPageComplete/>
            </div>
        </>
    )
}