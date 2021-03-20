import React from 'react';
import './App.css';
import TextHighlight from './TextHighlight'


export default function InputBlock ({onClick}) {
    return (
        <div className="inputBoxWrapper">
            <h2>Enter some medical text here</h2>
             <textarea className="inputBox" type="text" id="fname" name="medical" placeholder="medical text"/>
             <TextHighlight
                text="Analyze"
                onClick={() => {onClick()}}
             />
        </div>
    )
}