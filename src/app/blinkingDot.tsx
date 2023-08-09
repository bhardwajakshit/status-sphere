import React from "react";

interface BlinkingDotProps {
  color: string;
}

const BlinkingDot: React.FC<BlinkingDotProps> = ({ color }) => {
  return (
    <>
      <div className="flex items-center justify-between gap-1">
        <div className="line"></div>
        <div className="dot"></div>
        <style jsx>{`
          .line {
            width: 20px;
            height: 6px;
            background-color: ${color};
          }
          .dot {
            width: 10px;
            height: 10px;
            background-color: ${color};
            border-radius: 50%;
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default BlinkingDot;
