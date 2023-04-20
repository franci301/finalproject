import React, {useState} from 'react';
import NavMain from '../Layouts/NavMain';
import colourNamesExhaustive from "../Assets/image-processing/colourNamesExhaustive";
import colourNamesInverted from "../Assets/image-processing/colourNamesInverted";
import gridBasedSearch from "../Assets/image-processing/gridBasedSearch";
import {useNavigate} from "react-router-dom";
import {Slider} from "@mui/material";
import getContrastTextColor from "../Assets/image-processing/getContrastTextColor";

export default function GridSearch() {

  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('');
  const [gridColors, setGridColors] = useState(Array(9).fill(''));
  const [range, setValue] = useState(2);

  // function to change the colour of a block
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  // function to replace a current grid index with a colour in the useState
  const handleCellClick = (index) => {
    const newGridColors = [...gridColors];
    newGridColors[index] = selectedColor;
    setGridColors(newGridColors);
  };

    // function to search using the completed grid
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
        // call to the grid search
        const arr = await gridBasedSearch(colours,range);
        console.log(arr);
        if(arr.length > 0){
          const result = groupByIndex(arr);
          console.log(result);

          navigate('/advancedResults',{
            state:{
              result1: result[0],
              result2: result[1],
              result3: result[2],
            }
          });
        }
      }
    }

    // Function to sort the output into 3 arrays according to their index variable
    function groupByIndex(arr) {
      const groups = {};
      for (const item of arr) {
        if (!groups[item.index]) {
          groups[item.index] = [];
        }
        groups[item.index].push(item);
      }
    return Object.values(groups).sort((a, b) => a[0].index - b[0].index);
    }
     const handleChange = ( event,newValue) => {
        setValue(newValue);
      };


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
        <div className={'d-flex flex-column p-4'}>
                <p>Search radius (km):</p>
                <br/>
                <Slider
                  aria-label="Temperature"
                  defaultValue={2}
                  valueLabelDisplay="on"
                  onChange={handleChange}
                  step={2}
                  marks
                  min={2}
                  max={14}
                  getAriaValueText={value => `${value} km`}
                />
            </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </>
  );
}

