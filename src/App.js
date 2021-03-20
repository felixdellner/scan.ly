import '@google/model-viewer';
import './App.css';
import React, { useState } from 'react';
import InputBlock from './InputBlock'
import TextHighlight from './TextHighlight'

const HotSpots = ({selection}) => {
  const data = {
    "Sacrum": {
      dataPosition: "-0.5780835970207967m 12.383100107175464m 0.8460004398151098m",
      dataNormal: "0.03495597933951483m 0.15497188046075835m 0.987300256140386m"
    },
    "Cervical": {
      dataPosition: "-1.0596636952244207m 32.34737046844669m 0.7617547072107841m",
      dataNormal: "0.015912726067431132m -0.0034307482747116982m 0.9998674987794026m"
    },
    "Thoracic": {
      dataPosition: "-3.6237639083956363m 24.706428355418197m -0.3802436130800346m",
      dataNormal: "0.05899767776659567m 0.1553287392739275m 0.9860995166684351m"
    },
    "Lumbar": {
      dataPosition: "-2.1453372438539127m 17.638328579853244m 1.2764668207031173m",
      dataNormal: "0.6451203302324426m 0.506250786708821m 0.5723022806852024m"
    },
    // "Coccyx": {
    //   dataPosition: "1 1 1",
    //   dataNormal: "1 0 0.5"
    // },
  } 
    const spots = Object.keys(data).map((name) =>{
      const slotName = "hotspot-hand" + name
      return (
      <button slot={slotName} className={name === selection ? "visible" : null}
          data-position={data[name].dataPosition}
          data-normal={data[name].dataNormal}>
        <div id="annotation">{name}</div>
      </button>
    )})  

    return spots
}

function App() {
  const [activeSelection, setActiveSelection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [textToAnylize, setTextToAnylize] = useState(null);

  const keyWords = ["Cervical", "Thoracic", "Lumbar", "Sacrum", "Coccyx"]
  return (
    <div className="App">
        {/* <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script> */}
      {currentPage === 0 ?
      <InputBlock
        onClick={() => setCurrentPage(1)}
        setTextToAnylize={(t) => setTextToAnylize(t)}
      />
      :
      <div className="contentWrapper">
          <div className= "rowItem">
            <p>{textToAnylize}</p>
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
              <model-viewer 
              ar ar-modes="webxr" src='spine2.glb' camera-controls auto-rotate style={{height: "500px", width: "500px"}} >
              {/* <div id="annotation">This annotation is fixed in screen-space</div> */}
                  <HotSpots selection={activeSelection}></HotSpots>
                  {/* <button slot="hotspot-hand" data-position="-1.627 11.6 0.19" data-normal="-0.8 0.37 0.482">
                    <div id="annotation">Hard-coded Sacrum</div>
                  </button> */}
                  {/* <button slot="hotspot-hand" ></button>
                  <div slot="hotspot-hand"></div> */}
              </model-viewer>
            </div>
        </div>
  }
    </div>
  );
}

export default App;
