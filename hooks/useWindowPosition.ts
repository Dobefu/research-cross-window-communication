export default function useWindowPosition() {
  const getWindowPosition = () => {
    return {
      x: globalThis.window.screenX,
      y: globalThis.window.screenY,
      width: globalThis.window.outerWidth,
      height: globalThis.window.outerHeight,
      top: globalThis.window.screenTop,
      left: globalThis.window.screenLeft,
    };
  };

  return { getWindowPosition };
}
