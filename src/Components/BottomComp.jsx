import Card from '../Components/Card'
function BottomComp() {
    
    let popularItems = [{name:'Location 1',rating:5, distance:'2km'},{name:'Location 2',rating:4,distance:'5km'}]
    
    return (
        <div className='d-flex flex-row'>
            <>
                {/*place images further down so that theyre barely visible*/}
                {popularItems.length !== 0 ?
                    popularItems.map((content, index) => (
                        <Card name={content.name} rating={content.rating} distance={content.distance} key={index} latLon={[51.52194, -0.04990]}/>
                    ))
                    :
                    <>nope</>
                }
            </>
        </div>
    );

}
export default BottomComp;
