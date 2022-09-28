import React from "react";

export default function Logo() {
  return (
    <svg width="55" height="55">
      <circle
        cx="25"
        cy="25"
        r="25"
        fill="grey"
        stroke="white"
        stroke-width="2px"
        mask="url(#quarter)"
      />
      <line x1="25" y1="0" x2="25" y2="25" stroke="white" stroke-width="2px" />
      <line x1="25" y1="25" x2="50" y2="25" stroke="white" stroke-width="2px" />
      <line
        x1="25"
        y1="25"
        x2="42.5"
        y2="7.5"
        stroke="white"
        stroke-width="2px"
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
