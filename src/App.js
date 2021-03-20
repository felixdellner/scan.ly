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

const HotSpot = ({text, selection}) => {
  const dataPostions = {
    "Cervical": "-0.54 0.93 0.1", 
    "Thoracic": 1,
    "Lumbar": 1 ,
    "Sacrum": 1 ,
    "Coccyx": 1,
  }
  return(
    <button slot="hotspot-hand" data-position="-0.54 0.93 0.1" data-normal="-0.73 0.05 0.69">
      <div id="annotation">{text}</div>
    </button>
  )
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
              <model-viewer className="modelDisplay" src='spine2.glb' camera-controls auto-rotate>
                  <HotSpot text="text" selection={activeSelection}></HotSpot>
                </model-viewer>
            </div>
          </div>
    </div>
  );
}

export default App;
