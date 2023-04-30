import NavMain from "../Layouts/NavMain";
import searchShortcut from "../Assets/image-processing/searchShortcut";
import '../Assets/Styles/appInformation.css'

/**
 * Page showing the user how to search for images using the basic search functionality
 */
export default function SearchInformationPage(){

    return(
        <>
            <NavMain/>
            <div className={'d-flex flex-column p-4'}>
                <br/>
                <h4>Shortcut queries:</h4>
                <br/>
                <p>Please do not include the '/' when searching.</p>
                <p>Use either word but not both</p>
                <br/>
                <div className='information-container'>
                    <ul>
                        {Object.keys(searchShortcut).map((colour)=>{
                           return(
                               <li key={colour}>{colour}</li>
                           )
                        })}
                    </ul>
                </div>
                <br/>
                <h4>Sample Queries</h4>
                <div className='information-container'>
                    <ul>
                        <li>
                            sky blue
                        </li>
                        <li>
                            blue
                        </li>
                        <li>
                            red
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
