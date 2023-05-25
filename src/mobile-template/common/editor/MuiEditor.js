import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import './MuiEditor.css'
import Toolbar from "./Toolbar";

const MuiEditor = ({ html, tagName, placeholder, onChange, field, disabled = false, barDisable = true }) => {

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditable(barDisable);
    }, [barDisable]);

    return (
        <div className="muieditor"
            onFocus={() => setEditable(true)}
            // onBlur={() => setEditable(false)}
        >
            <ContentEditable
                className="muieditor-content"
                html={html} // innerHTML of the editable div
                tagName={tagName ?? 'div'}
                onChange={(e) => onChange(field, e.target.value)} // handle innerHTML change
                data-placeholder={placeholder}
                disabled={disabled}
            />
            {
                editable ? <Toolbar tagName={tagName} /> : <></>
            }
        </div>
    );
};


export default MuiEditor;
