import NavMain from "../Layouts/NavMain";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function AdvancedResults() {
  const location = useLocation()
  const [result, setBase] = useState(null);
  const [group1, setGrp1] = useState(null);
  const [group2, setGrp2] = useState(null);
  const [group3, setGrp3] = useState(null);

  useEffect(() => {
    const data = location.state;
    console.log(data.result);


    if(data.result){
      setBase(data.result);
    }else{
      setGrp1(data.result1 && data.result1.length > 0 ? data.result1 : null);
      setGrp2(data.result2 && data.result2.length > 0 ? data.result2 : null);
      setGrp3(data.result3 && data.result3.length > 0 ? data.result3 : null);
    }
  }, [location.state]);

return (
  <>
    <NavMain />
    <div className={'p-4'}>
      {result ? (
        <>
          {result.length > 0 ? (
            result.map((value, index) => (
              <div className="d-flex flex-row" key={index}>
                <img src={value.image} alt="" className="p-2 w-50" />
              </div>
            ))
          ) : (
            <p>No images matching this grid have been found</p>
          )}
        </>
      ) : (
          <>
              {group1 && group1.length > 0 && (
                <>
                  <h4>Both images contain the same colours and at the same locations</h4>
                  {group1.map((value, index) => (
                    <div className="d-flex flex-row" key={index}>
                      <img src={value.image} alt="" className="p-2 w-50" />
                    </div>
                  ))}
                </>
              )}
              {group2 && group2.length > 0 && (
                <>
                  <h4>A color from the same colour category group exists in both images, but doesnt necessarily exist at the same locations</h4>
                  {group2.map((value, index) => (
                    <div className="d-flex flex-row" key={index}>
                      <img src={value.image} alt="" className="p-2 w-50" />
                    </div>
                  ))}
                </>
              )}
              {group3 && group3.length > 0 && (
                <>
                  <h4>The colours exist in both images, but not at the same locations.</h4>
                  {group3.map((value, index) => (
                    <div className="d-flex flex-row" key={index}>
                      <img src={value.image} alt="" className="p-2 w-50" />
                    </div>
                  ))}
                </>
              )}
            </>
      )}
    </div>
  </>
);



}
