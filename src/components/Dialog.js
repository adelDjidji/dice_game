import React from 'react';
import "../styles/dialog.css"

/**
 * 
 * Dialog component
 */
export default function Dialog({ content,isOpen = false, footer, onClose }) {
    return <div className={`dialog-container ${isOpen ? "open" : "hid"}`}>
        <div className="dialog-content">
            <span onClick={onClose} className="close">X</span>
            <div className="dialog-body">
                {content}
            </div>
            <div className="dialog-footer">
                {footer}
                
            </div>
        </div>

    </div>
};
