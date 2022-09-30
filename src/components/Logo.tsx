import React from "react";

export default function Logo() {
  return (
    <svg width="55" height="55">
      <line x1="25" y1="25" x2="47" y2="25" stroke="white" stroke-width="2px" />
      <circle
        cx="25"
        cy="25"
        r="40%"
        fill="grey"
        stroke="white"
        stroke-width="4%"
        mask="url(#quarter)"
      />
      <line x1="25" y1="3" x2="25" y2="25" stroke="white" stroke-width="2px" />
      <line
        x1="25"
        y1="25"
        x2="41.5"
        y2="8.5"
        stroke="white"
        stroke-width="4px"
      />
      <defs>
        <mask id="quarter">
          <rect x="0" y="0" width="25" height="50" fill="white" />
          <rect x="0" y="25" width="50" height="25" fill="white" />
        </mask>
      </defs>
    </svg>
  );
}
