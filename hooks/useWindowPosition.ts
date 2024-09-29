import { useSignal, useSignalEffect } from "@preact/signals";

export default function useWindowPosition() {
  const windowPosition = useSignal({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const getWindowPosition = () => {
    windowPosition.value.x = globalThis.window.screenX;
    windowPosition.value.y = globalThis.window.screenY;
    windowPosition.value.width = globalThis.window.outerWidth;
    windowPosition.value.height = globalThis.window.outerHeight;
    windowPosition.value.top = globalThis.window.screenTop;
    windowPosition.value.left = globalThis.window.screenLeft;

    requestAnimationFrame(getWindowPosition);
  };

  useSignalEffect(getWindowPosition);
}
