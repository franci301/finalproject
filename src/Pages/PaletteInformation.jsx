import NavMain from "../Layouts/NavMain";
import colourNames from '../Assets/image-processing/colourNamesExhaustive';

/**
 * function to display all the palette information on the application
 */
export default function PaletteInformation() {
    const colorListContainerStyle = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    };

    const colorSquareStyle = {
      display: "inline-block",
      width: "15%",
      margin: 10,
      textAlign: "center",
    };

  return (
    <>
      <NavMain />
      <div className="d-flex flex-row" style={colorListContainerStyle}>
        {Object.entries(colourNames).map(([colorName, colorHex]) => (
          <div key={colorName} style={colorSquareStyle}>
            <div style={{ width: 60, height: 60, backgroundColor: colorHex }} />
            <div style={{ fontSize: 14 }}>{colorName.replace('-',' ')}</div>
          </div>
        ))}
      </div>
    </>
  );
}
