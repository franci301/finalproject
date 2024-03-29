import MiddleComp from '../Components/MiddleComp';
import BottomComp from '../Components/BottomComp';
import NavMain from '../Layouts/NavMain';
import '../Assets/Styles/Homepage.css';
import {useEffect} from "react";
import getCurrentLocation from "../GetAndSet/get/getCurrentLocation";

/**
 *  Function to display the map and the most popular locations on the homepage
 */
function HomePage() {

    useEffect(()=>{
        // fetch users location and save it to local storage
        handleUserLocation().then((res) =>{
            localStorage.setItem('user-location',res.payload.latitude + '/'+res.payload.longitude);
        })
},[]);

    async function handleUserLocation(){
       return await getCurrentLocation();
    }


    return (
        <div className='text-secondary d-flex flex-column justify-content-between' >
            <NavMain />
            <div className='d-flex flex-column p-4' id='homepage-container'>
                <div className="d-flex justify-content-center" style={{ height: '45vh' }} id='middle-comp'>
                    <MiddleComp />
                </div>
                <div className="d-flex justify-content-center pb-4" id='bottom-comp'>
                    <BottomComp />
                </div>
            </div>
        </div>
    );
}
export default HomePage;