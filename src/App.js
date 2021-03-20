import '@google/model-viewer';
import './App.css';
import React, { useState, useEffect } from 'react';
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

async function getData(url = "https://scanly1.cognitiveservices.azure.com/text/analytics/v3.1-preview.1/keyPhrases?showStats=true", 
data = {
    "documents": [
      {
        "language": "en",
        "id": "1",
        "text": "FINDINGS: There is normal lumbosacral vertebral body height and alignment on this supine, non-weight bearing exam. Vertebral body marrow signal is normal. The conus medullaris is normal and terminates at L1. T12-L1: Sagittal series-mild secondary discogenic facet change without stenosis. L1-L3: Sagittal series-normal disc spaces with patent canal and foramina. L3-L4: Series 6 image 10-normal disc space show mild/moderate facet arthrosis with patent canal and foramina. L4-L5: Image 21-mild to moderate decreased disc signal and disc height with mild endplate spondylitic change, bulge and a left paracentral disc herniation extruded superiorly, 7 mm AP by 16 mm mL by 14mm CC, with the left L5 nerve root sleeve impingement in the lateral recess, with severe right more than left facet arthrosis. Narrowing of the thecal sac, 8 mm, with mild left lateral recess stenosis, patent right lateral recess and mild to moderate left and mild right foraminal"
      }]
}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'a5bdde0df40b41f58f6fef2d4566c345'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  const r = await response.json();
  console.log(r)
  return r // parses JSON response into native JavaScript objects
}

const filterKeyPhrases = (keyPhrases) => {

}

function App() {
  const [activeSelection, setActiveSelection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [textToAnylize, setTextToAnylize] = useState(null);
  const keyWords = ["Cervical", "Thoracic", "Lumbar", "Sacrum", "Coccyx"]
  const [keyPhrases, setKeyPhrases] = useState([]);

  const callApi = async () => {
    const result = await getData()
    const keyPhrases = result?.documents[0].keyPhrases
    console.log(result)
    console.log(keyPhrases)
    if(keyPhrases){
      filterKeyPhrases(keyPhrases)
      setKeyPhrases(keyPhrases)
    }
  }

  useEffect(() => {
    document.title = `scan.ly`;
    callApi()
  }, []);

  return (
    <div className="App">

      {currentPage === 0 ?
      <InputBlock
        onClick={() => setCurrentPage(1)}
        setTextToAnylize={(t) => setTextToAnylize(t)}
      />
      :
      <div className="contentWrapper">
          <div className= "rowItem">
            {keyPhrases.map((m) => <p>{m}</p>)}
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
              <model-viewer ar ar-modes="webxr" src='spine2.glb' camera-controls auto-rotate style={{height: "500px", width: "500px"}} >
                  <HotSpots selection={activeSelection}></HotSpots>
              </model-viewer>
            </div>
        </div>
  }
    </div>
  );
}

export default App;
