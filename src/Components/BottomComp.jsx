import '../Assets/Styles/bottomComp.css'
import Card from '../Components/Card'
import image1 from '../Assets/Images/popular1.jpeg';
import image2 from '../Assets/Images/popular2.jpeg';
function BottomComp() {


    let popularItems = [{name:'Location 1',rating:5, distance:'2km', img:image1},{name:'Location 2',rating:4,distance:'5km', img:image2}]


    return (
        <div className='d-flex flex-column align-items-center'>
            <h5>Most Popular Locations</h5>
            <div className={'d-flex flex-row pb-5'}>
                {popularItems.length !== 0 ?
                    popularItems.map((content, index) => (
                        <Card name={content.name} rating={content.rating} distance={content.distance} key={index} latLon={[51.52194, -0.04990]} image={content.img} index={index}/>
                    ))
                    :
                    <>nope</>
                }
            </div>
        </div>
    );

}
export default BottomComp;
