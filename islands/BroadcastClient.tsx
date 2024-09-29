import useWindowPosition from "../hooks/useWindowPosition.ts";
import { useSignal, useSignalEffect } from "@preact/signals";

export default function Counter() {
  const bc = new BroadcastChannel("application");
  const uuid = crypto.randomUUID();

  const { getWindowPosition } = useWindowPosition();
  const windowPosition = useSignal<
    ReturnType<typeof getWindowPosition> | object
  >({});

  const update = () => {
    windowPosition.value = getWindowPosition();

    // @ts-expect-error TODO Fix later.
    bc.postMessage({ command: "ping", uuid, value: windowPosition.v });
    requestAnimationFrame(update);
  };

  useSignalEffect(update);

  useSignalEffect(() => {
    bc.onmessage = function (ev) {
      console.log(`Unhandled event: ${ev}`);
    };
  });

  return (
    <>
    </>
  );
}
