import Card from '../Components/Card'
function BottomComp() {
    
    let popularItems = new Array();
    popularItems.push({name:'aa'});

    console.log(popularItems.length);
    return (
        <div className='d-flex flex-row'>
            <>

                {popularItems.length !== 0 ?
                    popularItems.map((content, index) => (
                        <Card state={content} key={index}/>
                    ))
                    :
                    <>nope</>
                }
            </>
        </div>
    );

}
export default BottomComp;
