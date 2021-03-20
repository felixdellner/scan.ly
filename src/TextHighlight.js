import React from 'react';

export default function TextHighlight ({text, onClick, activeSelection}) {
    const isSelected = text === activeSelection 
    return(
      <div className="highlight"
           id={isSelected && "highlightSelected"}
           onClick={() => onClick(text)} 
      >
        <p>{text}</p>
      </div>
  )}