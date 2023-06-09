import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({children, disabled, onClick, position}) {
  return (
    <button className={`
      ${position === 'right' ? 'inset-y-0 right-0 rounded-l-md' : 'inset-y-0 left-0 rounded-r-md'} 
      z-[999] w-12 bg-black/50 hover:bg-white/50
      `}
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "absolute",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete
    } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} position={'left'} onClick={() => scrollPrev()}>
      L
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(
    VisibilityContext
  );

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} position={'right'} onClick={() => scrollNext()}>
      R
    </Arrow>
  );
}
