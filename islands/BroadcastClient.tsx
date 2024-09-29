import useWindowPosition from "../hooks/useWindowPosition.ts";
import { useSignalEffect } from "@preact/signals";

export default function Counter() {
  const bc = new BroadcastChannel("application");
  const uuid = crypto.randomUUID();

  const windowPosition = useWindowPosition();

  const update = () => {
    bc.postMessage({ command: "ping", uuid, value: windowPosition });
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
      <pre>{JSON.stringify(windowPosition, null, 2)}</pre>
    </>
  );
}
