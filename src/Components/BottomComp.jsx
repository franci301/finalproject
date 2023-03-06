import Card from '../Components/Card'
function BottomComp() {
    
    let popularItems = [{name:'aa',rating:'5 stars', distance:'2km'},{name:'bb',rating:'4 stars',distance:'5km'}]
    
    return (
        <div className='d-flex flex-row'>
            <>

                {popularItems.length !== 0 ?
                    popularItems.map((content, index) => (
                        <Card name={content.name} rating={content.rating} distance={content.distance} key={index}/>
                    ))
                    :
                    <>nope</>
                }
            </>
        </div>
    );

}
export default BottomComp;
