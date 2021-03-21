import '@google/model-viewer';
import './App.css';
import React, { useState, useEffect } from 'react';
import InputBlock from './InputBlock'
import TextHighlight from './TextHighlight'

const inputText = "There is normal lumbosacral vertebral body height and alignment on this supine, non-weight bearing exam. Vertebral body marrow signal is normal. The conus medullaris is normal and terminates at L1. T12-L1: Sagittal series-mild secondary discogenic facet change without stenosis. L1-L3: Sagittal series-normal disc spaces with patent canal and foramina. L3-L4: Series 6 image 10-normal disc space show mild/moderate facet arthrosis with patent canal and foramina. L4-L5: Image 21-mild to moderate decreased disc signal and disc height with mild endplate spondylitic change, bulge and a left paracentral disc herniation extruded superiorly, 7 mm AP by 16 mm mL by 14mm CC, with the left L5 nerve root sleeve impingement in the lateral recess, with severe right more than left facet arthrosis. Narrowing of the thecal sac, 8 mm, with mild left lateral recess stenosis, patent right lateral recess and mild to moderate left and mild right foraminal"
const orginalSrc = 'https://cdn.glitch.com/2b03f5e7-2862-4b54-94ff-980cbc384186%2Fspine_default.glb?v=1616274977114'

const HotSpots = ({selection}) => {
  const data = {
    "T12": {
    dataPosition: "2.363156456501347m 9.321591397198665m 1.4331525282193014m",
    dataNormal: "0.05470006337332172m 0.9984165350372055m 0.013127285753547034m"
    },
    "L1": {
    dataPosition: "3.295013293203919m 6.789724624383718m 1.8148962866728209m",
    dataNormal: "0.842442998508682m 0.5340302558529746m 0.07142464628759235m"
    },
    "L3": {
    dataPosition: "3.531537741177914m 5.416282536759944m 1.6646832066721184m",
    dataNormal: "0.27678742621878316m 0.9609307754628429m -0.0008749031726036114m"
    },
    "L4": {
    dataPosition: "3.56413146810344m 4.059682469893231m 1.6528685590056014m",
    dataNormal: "0.9846680073503973m -0.16847089599446086m 0.04523795423559223m"
    },
    "L5": {
    dataPosition:"3.154503351205559m 2.7007529194890267m 1.6406301086157387m",
  dataNormal: "0.8911679585711741m -0.45086353050562544m 0.050415736393406484m"
    },
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
  return r // parses JSON response into native JavaScript objects
}

const filterKeyPhrases = (keyPhrases) => {
  const keys = [
    "mild left lateral recess stenosis",
    "moderate left",
    "disc height",
    "mild right foraminal",
    "left facet arthrosis",
    "Sagittal series-normal disc spaces",
    "left paracentral disc herniation",
    "moderate decreased disc signal",
    "Sagittal series-mild secondary discogenic facet change",
     "moderate facet arthrosis",
    "patent canal",
    "L1-L3",
    "normal lumbosacral vertebral body height",
    "image",
    "L4-L5",
    "T12-L1",
    "L3-L4",
    "left L5 nerve root sleeve impingement",
    "Vertebral body marrow signal",
    "alignment",
    "bulge",
    "supine",
    "non-weight",
    "exam",
    "FINDINGS",
    "CC",
    "conus medullaris",
    "thecal sac",
    "AP"]

    const bones = ['L1']
    
    keys.forEach(phrase => { 
      console.log(phrase)
      if(phrase.length < 7 && (phrase[2] === '-' || phrase[3] === '-')){
        bones.push(phrase)
      }
    });
    console.log(bones)
    return bones
}

const createLinks = (inputText, onClick) => {
  let textLines = inputText.split('.');
  let keyPhrases = filterKeyPhrases()

  console.log(textLines)
  
  return textLines.map((line) => {
    let keyWord = "" 
    keyPhrases.forEach((key) => {
      if(line.includes(key)) {
        keyWord = key
      } 
    })
    
    return (<p className={keyWord !== "" ? "textLine isLink" : "textLine"} onClick={() => onClick(keyWord)}>{line+'.'}</p>)
    }
  )
}

function App() {
  const [activeSelection, setActiveSelection] = useState("");
  const [userText, setUserText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [textToAnylize, setTextToAnylize] = useState(null);
  const [PhraseDescription, setPhraseDescription] = useState(null);
  const keyWords = ["T12", "L1", "L3", "L4", "L5"]


  const sources = {
      "L1-L3": {
        description:" test ",
        select:"L1",
        src:"https://cdn.glitch.com/423fd5dd-e15b-4d06-b8a2-e0895d14b533%2Fspine_l1-l3.glb?v=1616277772039"},
      "L3-L4": {
        description: "Facet athrosis means that the joints between the bones is degenerating. It can be treated by a medical professional with steroids, but you can also improve your situation by avoiding heavy lifting and intense back movement.",
        select:"L3",
        src:"https://cdn.glitch.com/423fd5dd-e15b-4d06-b8a2-e0895d14b533%2Fspine_l1-l3.glb?v=1616277772039"
      },
      "L1": {
        select:"L1",
        src:"https://cdn.glitch.com/423fd5dd-e15b-4d06-b8a2-e0895d14b533%2Fspine_l1.glb?v=1616277772481"
      },
      "L4-L5": {
        select:"L4",
        src:"https://cdn.glitch.com/423fd5dd-e15b-4d06-b8a2-e0895d14b533%2Fspine_l4-l5.glb?v=1616277772610"
      },
      "T12-L1": {
        select:"T12",
        src:"https://cdn.glitch.com/423fd5dd-e15b-4d06-b8a2-e0895d14b533%2Fspine_t12-l1.glb?v=1616277772949"
      },
      "L5-S1": {
        select:"L5",
        src:"https://cdn.glitch.com/423fd5dd-e15b-4d06-b8a2-e0895d14b533%2Fspine_l5-s1.glb?v=1616277772984"
      }
    }
  const [keyPhrases, setKeyPhrases] = useState(filterKeyPhrases());
  const [source, setSource] = useState(orginalSrc);

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

  const updateSelection = (selection) => {
    // get data

    setActiveSelection(sources[selection]?.select)
    setSource(sources[selection]?.src ?? orginalSrc)
    setPhraseDescription(sources[selection]?.description)
  }

  useEffect(() => {
    document.title = `scan.ly`;
    // callApi()
    // setUserText(createLinks(inputText))
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
            <h2>Your MRI Report </h2>
            {createLinks(inputText, updateSelection)}
          </div>
          <div className= "rowItem">
              <model-viewer ar ar-modes="webxr" src={source} camera-controls auto-rotate style={{height: "500px", width: "500px"}} >
                  <HotSpots selection={activeSelection}></HotSpots>
              </model-viewer>
              {PhraseDescription && <div className="tipBox"><p>{"What it means: " + PhraseDescription}</p></div>}

            </div>
        </div>
  }
    </div>
  );
}

export default App;
