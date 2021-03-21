import React from 'react';
import './App.css';
import TextHighlight from './TextHighlight'
import Button from '@material-ui/core/Button';

export default function InputBlock ({onClick}) {
    return (
        <div className="inputBoxWrapper">
            <h1>Scan.ly</h1>
            <h3>Upload a file or take a photo to scan your medical report</h3>
            <div>
             <TextHighlight
                text="Choose file"
                onClick={() => {onClick()}}
             />
            <TextHighlight
                text="Take photo"
                onClick={() => {onClick()}}
             />
             </div>
        </div>
    )
}