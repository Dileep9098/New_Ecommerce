// components/Tooltip.jsx
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Tooltip.css";  // styling file

export default function Tooltip({ children, text, placement = "top" }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const refChild = useRef(null);
  const refTooltip = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const childRect = refChild.current.getBoundingClientRect();
    const tooltipRect = refTooltip.current.getBoundingClientRect();

    let top, left;
    if (placement === "top") {
      top = childRect.top - tooltipRect.height - 8; // 8px gap
      left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;
    } else if (placement === "bottom") {
      top = childRect.bottom + 8;
      left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;
    } else {
      // default to top
      top = childRect.top - tooltipRect.height - 8;
      left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;
    }

    setCoords({ top, left });
  }, [visible, placement]);

  return (
    <>
      <span
        ref={refChild}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ display: "inline-block" }}
      >
        {children}
      </span>

      {visible &&
        ReactDOM.createPortal(
          <div
            className={`tooltip-box tooltip-${placement}`}
            ref={refTooltip}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              zIndex: 9999,
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}
