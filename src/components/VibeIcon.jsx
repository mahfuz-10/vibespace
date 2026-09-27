import React from 'react';

export const VibeIcon = ({
  size = 40,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`vibe-icon ${className}`}
      aria-hidden="true"
    >
      {/* Outer ambient arc */}
      <path
        d="M7.2 23.8C4.9 21.2 3.7 17.8 4 14.3C4.4 9.1 8.2 4.7 13.2 3.1"
        stroke="var(--champagne)"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Middle ambient arc */}
      <path
        d="M10.4 21.1C8.8 19.1 8 16.6 8.2 14.1C8.5 10.6 10.8 7.5 14 6.1"
        stroke="var(--sage)"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Inner ambient arc */}
      <path
        d="M13.5 18.7C12.6 17.2 12.3 15.5 12.7 13.9C13.2 11.8 14.7 10.1 16.7 9.3"
        stroke="var(--sage)"
        strokeOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default VibeIcon;