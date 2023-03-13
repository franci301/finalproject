import TopComponent from '../Components/TopComponent';
import MiddleComp from '../Components/MiddleComp';
import BottomComp from '../Components/BottomComp';
import NavMain from '../Layouts/NavMain';
import '../Assets/Styles/Homepage.css';
function HomePage() {

    // get 2 most viewed location and save to state

    return (
        <div className='text-secondary d-flex flex-column justify-content-between' >
            <NavMain />
            <div className='d-flex flex-column py-1 px-3' id='homepage-container'>
                <div className="d-flex flex-col justify-content-center" id='top-comp'>
                    <TopComponent />
                </div>
                <div className="d-flex justify-content-center" style={{ height: '45vh' }} id='middle-comp'>
                    <MiddleComp />
                </div>
                <div className="d-flex justify-content-center pb-4" id='bottom-comp'>
                    <BottomComp />
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    );
}
export default HomePage;