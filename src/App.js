import logo from './logo.svg';
import '@google/model-viewer';
import './App.css';
import React, { useState } from 'react';

const TextHighlight = ({text, onClick, activeSelection}) => {
  const isSelected = text === activeSelection 
  return(
    <div className="highlight"
         id={isSelected && "highlightSelected"}
         onClick={() => onClick(text)} 
    >
      <p>{text}</p>
    </div>
)}

const HotSpot = ({selection}) => {
  const dataPosition = {
    "Cervical": {
      dataPosition: "1 0 1",
      dataNormal: "1 1 1"
    },
    "Thoracic": {
      dataPosition: "1 0 1",
      dataNormal: "1 0 1"
    },
    "Lumbar": {
      dataPosition: "1 0 0",
      dataNormal: "1 0 1"
    },
    "Sacrum": {
      dataPosition: "1 1 1",
      dataNormal: "1 0 1"
    },
    "Coccyx": {
      dataPosition: "1 1 1",
      dataNormal: "1 0 0.5"
    },
  }

  const data = dataPosition[selection]
  return data ? 
  <button slot="hotspot-hand" 
      data-position={data.position} 
      data-normal={data.position}>
    <div id="annotation">{selection}</div>
  </button> : null
}

function App() {
  const [activeSelection, setActiveSelection] = useState("");
  const keyWords = ["Cervical", "Thoracic", "Lumbar", "Sacrum", "Coccyx"]
  return (
    <div className="App">
      <div className="contentWrapper">
          <div className= "rowItem">
            <h2>Your MRI REPORT </h2>
            {keyWords.map((word) => 
            <TextHighlight 
              onClick={(t) => setActiveSelection(t)}
              text={word}
              activeSelection={activeSelection}
            />)
            }
          </div>
          <div className= "rowItem">
              <model-viewer className="modelDisplay" width='500px' height="500px" src='spine2.glb' camera-controls auto-rotate>
                  <HotSpot selection={activeSelection}></HotSpot>
                </model-viewer>
            </div>
        </div>
    </div>
  );
}

export default App;
