import React from 'react';

const WaveDesign = ({ className = "" }) => {
  return (
    <svg
      width="200" 
      height="30" 
      viewBox="0 0 200 60" 
      className={`text-black ${className}`}
    >
      <path
        d="M0,20 Q25,5 50,20 T100,20 T150,20 T200,20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default WaveDesign;
