import React from 'react';
import './App.css';
import TextHighlight from './TextHighlight'


export default function InputBlock ({onClick}) {
    return (
        <div className="inputBoxWrapper">
            <h1>Scan.ly</h1>
            
            <h3>Upload file or photo to scan your medical report</h3>
            <div>
             <TextHighlight
                text="Choose file"
                onClick={() => {onClick()}}
             />
             </div>
        </div>
    )
}