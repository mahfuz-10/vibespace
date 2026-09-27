import React from "react";

const Logo = ({ size = 32, className = "" }) => {
  return (
    <div
      className={`vibespace-logo ${className}`}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="vibespace-logo-arcs">
          {/* Outer ambient arc */}
          <path
            d="M8.8 7.2 A12 12 0 0 1 23.2 24.8"
            stroke="var(--champagne)"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Middle ambient arc */}
          <path
            d="M11.3 9.8 A8.8 8.8 0 0 1 21.2 22.4"
            stroke="var(--sage)"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Inner ambient arc */}
          <path
            d="M13.8 12.5 A5.6 5.6 0 0 1 19.1 20.1"
            stroke="var(--sage)"
            strokeOpacity="1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <style>
        {`
          .vibespace-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .vibespace-logo-arcs {
            transform-box: fill-box;
            transform-origin: center;
            animation: vibespaceAmbientPulse 6s ease-in-out infinite;
            transition: transform 400ms ease;
          }

          .vibespace-logo:hover .vibespace-logo-arcs {
            transform: rotate(8deg);
          }

          @keyframes vibespaceAmbientPulse {
            0%,
            100% {
              opacity: 0.6;
            }

            50% {
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .vibespace-logo-arcs {
              animation: none;
              transition: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Logo;