import { useSignalEffect } from "@preact/signals";
import { useState } from "preact/hooks";

export default function useWindowPosition() {
  const [windowPosition, setWindowPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const getWindowPosition = () => {
    setWindowPosition({
      x: globalThis.window.screenX,
      y: globalThis.window.screenY,
      width: globalThis.window.outerWidth,
      height: globalThis.window.outerHeight,
      top: globalThis.window.screenTop,
      left: globalThis.window.screenLeft,
    });

    requestAnimationFrame(getWindowPosition);
  };

  useSignalEffect(getWindowPosition);

  return windowPosition;
}
