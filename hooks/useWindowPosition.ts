export default function useWindowPosition() {
  const getWindowPosition = () => {
    return {
      x: globalThis.window.screenX,
      y: globalThis.window.screenY,
      width: globalThis.window.innerWidth,
      height: globalThis.window.innerHeight,
      top: globalThis.window.screenTop,
      left: globalThis.window.screenLeft,
    };
  };

  return { getWindowPosition };
}
