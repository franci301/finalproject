import TopComponent from '../Components/TopComponent';
import MiddleComp from '../Components/MiddleComp';
import BottomComp from '../Components/BottomComp';
import NavMain from '../Layouts/NavMain';

function HomePage() {

    // get 2 most viewed location and save to state

    return (
        <div className='text-secondary'>
            <NavMain />
            <div className='d-flex flex-column py-1 px-3'>
                <div className="d-flex flex-col py-3 justify-content-center">
                    <TopComponent />
                </div>
                <div className="d-flex justify-content-center pb-5">
                    <MiddleComp />
                </div>
                <div className="d-flex justify-content-center pt-5">
                    <BottomComp />
                </div>
            </div>

        </div>
    );
}
export default HomePage;