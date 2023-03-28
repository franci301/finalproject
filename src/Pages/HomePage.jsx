import MiddleComp from '../Components/MiddleComp';
import BottomComp from '../Components/BottomComp';
import NavMain from '../Layouts/NavMain';
import '../Assets/Styles/Homepage.css';
import {useEffect, useState} from "react";
import getCurrentLocation from "../GetAndSet/getCurrentLocation";
function HomePage() {

    const [images, setImages] = useState(null);

    useEffect(()=>{

        handleUserLocation().then((res) =>{
            localStorage.setItem('user-location',res.payload.latitude + '/'+res.payload.longitude);
        })


},[])

    // get 2 most viewed location and save to state - server side where every day/week i get the two highest rated photos/locations
    async function handleUserLocation(){
       return await getCurrentLocation();
    }



    return (
        <div className='text-secondary d-flex flex-column justify-content-between' >
            <NavMain />
            <div className='d-flex flex-column py-1 px-3' id='homepage-container'>
                <div className="d-flex justify-content-center" style={{ height: '45vh' }} id='middle-comp'>
                    <MiddleComp data={images}/>
                </div>
                <div className="d-flex justify-content-center pb-4" id='bottom-comp'>
                    <BottomComp />
                </div>
            </div>
            {/*<button onClick={getAllImagesNearMe}>Click me</button>*/}
        </div>
    );
}
export default HomePage;