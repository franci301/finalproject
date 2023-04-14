import React, { useState } from 'react';
import NavMain from '../Layouts/NavMain';
import percentageSearch from '../GetAndSet/percentageSearch';
import { Slider } from '@mui/material';
import colorList from '../Assets/image-processing/colourNamesExhaustive';
import getContrastTextColor from "../Assets/image-processing/getContrastTextColor";
import {useNavigate} from "react-router-dom";

export default function PercentageSearch() {

  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [range, setValue] = useState(2);
  const [colorInput, setColorInput] = useState('');
  const [percentageInput, setPercentageInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSearch() {
    const result = await percentageSearch(values, range);
    console.log(result);
    if(result.length > 0){
      navigate('/advancedResults',{
      state:{
          result: result,
          }
      });
    }
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddValues = () => {
    if (colorInput && percentageInput) {
      const newPercentage = parseFloat(percentageInput);
      const newTotal = Object.values(values).reduce((acc, val) => acc + val, 0) + newPercentage;

      if (newTotal <= 100) {
        setValues({ ...values, [colorInput]: newPercentage });
        setColorInput('');
        setPercentageInput('');
        setErrorMessage('');
      } else {
        setErrorMessage('Total percentage exceeds 100');
      }
    }
  };

  const handleRemoveValue = (color) => {
    const newValues = { ...values };
    delete newValues[color];
    setValues(newValues);
  };

  const totalPercentage = Object.values(values).reduce((acc, val) => acc + val, 0);



  return (
    <>
      <NavMain />
      <div className="p-4">
        <div className={'d-flex flex-column'}>
          <input
            type="number"
            value={percentageInput}
            onChange={(e) => setPercentageInput(e.target.value)}
            placeholder={'Percentage value'}
          />
          <br/>
          <select value={colorInput} onChange={(e) => setColorInput(e.target.value)}>
            <option value="">Select a color</option>
            {Object.entries(colorList).map(([colorName, colorCode]) => (
              <option
                key={colorName}
                value={colorName}
                style={{
                  color: getContrastTextColor(colorCode),
                  backgroundColor: colorCode,
                }}
              >
                {colorName}
              </option>
            ))}
          </select>
          <br/>
          <button onClick={handleAddValues}>Add</button>
        </div>
      <br/>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>Total percentage: {totalPercentage.toFixed(2)}%</p>
            <ul>
        {Object.entries(values).map(([color, percentage]) => (
          <li key={color} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: colorList[color],
                width: '20px',
                height: '20px',
                marginRight: '5px',
              }}
            ></div>
            {color}: {percentage}%
            <button onClick={() => handleRemoveValue(color)}>x</button>
          </li>
        ))}
      </ul>

      <div className="d-flex flex-column p-4">
        <p>Search radius (km):</p>
        <br />
        <Slider
          aria-label="Temperature"
          defaultValue={2}
          valueLabelDisplay="on"
          onChange={handleSliderChange}
          step={2}
          marks
          min={2}
          max={14}
          getAriaValueText={(value) => `${value} km`}
        />
      </div>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
        </div>
    </>
  );
}
