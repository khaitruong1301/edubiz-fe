import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function HightLightLanguage({ noiDung }) {
  return (
    <SyntaxHighlighter
      className="p-10"
      language="javascript"
      style={dracula}
      wrapLines={true}
    >
      {noiDung}
    </SyntaxHighlighter>
  );
}
