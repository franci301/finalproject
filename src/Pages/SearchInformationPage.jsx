import NavMain from "../Layouts/NavMain";
import searchShortcut from "../Assets/image-processing/searchShortcut";
import '../Assets/Styles/appInformation.css'
export default function SearchInformationPage(){

    return(
        <>
            <NavMain/>
            <div className={'d-flex flex-column p-4'}>
                <br/>
                <h4>List of shortcut searchable keywords:</h4>
                <p>Please do not include the '/' when searching.</p>
                <p>Use either word but not both</p>
                <div className='information-container'>
                    <ul>
                        {Object.keys(searchShortcut).map((colour)=>{
                           return(
                               <li key={colour}>{colour}</li>
                           )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
