import React from 'react';

import "../styles/dice.css"
export default function Dice({ value = 1 }) {
    if (value === 1)
        return <div className="dice-container">
            <span className="dot-container full-w"><span className="dot"></span></span>
        </div>
    else if (value === 2)
        return <div className="dice-container">
            <span className="dot-container full-w start"><span className="dot"></span></span>
            <span className="dot-container full-w"><span className="dot hidden"></span></span>
            <span className="dot-container full-w end"><span className="dot"></span></span>
        </div>
    else if (value === 3)
        return <div className="dice-container">
            <span className="dot-container full-w start"><span className="dot"></span></span>
            <span className="dot-container full-w"><span className="dot"></span></span>
            <span className="dot-container full-w end"><span className="dot"></span></span>
        </div>
    else if (value === 4)
        return <div className="dice-container">
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
        </div>
    else if (value === 5)
        return <div className="dice-container">
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container full-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
        </div>
    else if (value === 6)
        return <div className="dice-container">
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
            <span className="dot-container mid-w"><span className="dot"></span></span>
        </div>
    else return <div className="dice-container"></div>
};
