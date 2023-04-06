import React, { useState } from 'react';
import NavMain from '../Layouts/NavMain';
import colourNamesExhaustive from "../Assets/image-processing/colourNamesExhaustive";
import colourNamesInverted from "../Assets/image-processing/colourNamesInverted";
import gridBasedSearch from "../Assets/image-processing/gridBasedSearch";
import {useNavigate} from "react-router-dom";
export default function GridSearch() {

  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('');
  const [gridColors, setGridColors] = useState(Array(9).fill(''));

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleCellClick = (index) => {
    const newGridColors = [...gridColors];
    newGridColors[index] = selectedColor;
    setGridColors(newGridColors);
  };

  const getContrastTextColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  };

  async function handleSearch(){
    let error = false;
    let colours = [];
    for(let grid of gridColors){
      if(grid === ''){
        error = true;
        console.log('Please fill in the entire grid with some colours');
      }else{
        colours.push(colourNamesInverted[grid]);
      }
    }
    if(!error){
      const arr = await gridBasedSearch(colours);
      console.log(arr);
      if(arr.length > 0){
        navigate('/advancedResults',{
          state:{
            results:arr,
          }
        });
      }
    }
  }
  return (
    <>
      <NavMain />
      <div className="d-flex flex-column p-4">
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">Select a color</option>
          {Object.entries(colourNamesExhaustive).map(([colorName, colorCode]) => (
            <option
              key={colorName}
              value={colorCode}
              style={{
                color: getContrastTextColor(colorCode),
                backgroundColor: colorCode,
              }}
            >
              {colorName}
            </option>
          ))}
        </select>

        <div className="d-flex flex-wrap" style={{ width: '300px', height: '300px', margin: '20px 0' }}>
          {gridColors.map((color, index) => (
            <div
              key={index}
              onClick={() => handleCellClick(index)}
              style={{
                backgroundColor: color,
                width: '33.33%',
                height: '33.33%',
                border: '1px solid black',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            ></div>
          ))}
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </>
  );
}

