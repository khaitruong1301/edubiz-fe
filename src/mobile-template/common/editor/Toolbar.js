import React, { useEffect } from "react";
import { useState } from "react";

const barItems = [
  { icon: "fa fa-bold", command: "bold" },
  { icon: "fa fa-italic", command: "italic" },
  { icon: "fa fa-underline", command: "underline" },
  { icon: "fa fa-link", command: "createLink" },
  { icon: "fa fa-list-ol", command: "insertOrderedList" },
  { icon: "fa fa-list-ul", command: "insertUnorderedList" },
  { icon: "fa fa-strikethrough", command: "removeFormat" },
  // { tag: "H1", command: "formatBlock" },
  // { tag: "H2", command: "formatBlock" },
  { tag: "H3", command: "formatBlock" },
  { tag: "H4", command: "formatBlock" },
  { tag: "H5", command: "formatBlock" },
  { tag: "H6", command: "formatBlock" },
];

export default function Toolbar({ tagName }) {

  useEffect(() => {
    document.execCommand("formatBlock", false, tagName ?? 'p');
  }, []);

  const handleCommand = (e, item) => {
    e.preventDefault();
    if (item.command == 'removeFormat') {
      document.execCommand("removeFormat", false, '');
      document.execCommand("formatBlock", false, 'p');
    }
    else if (item.icon)
      document.execCommand(item.command, false, '');
    else
      document.execCommand(item.command, false, item.tag);
  }

  let listBar = barItems;
  if (tagName && (tagName.startsWith('h') || tagName.startsWith('h'))) {
    listBar = barItems.filter(item => item.icon);
  }

  return (
    <div className="muieditor-toolbar">
      {
        listBar.map((item, index) => {
          return <div key={index} className="toolbar-item" onMouseDown={(e) => handleCommand(e, item)}>
            {
              item.icon ? <i className={item.icon} aria-hidden="true"></i> : <span style={{ fontSize: '1rem' }}>{item.tag}</span>
            }
          </div>
        })
      }
    </div>
  );
}