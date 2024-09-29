import { useSignal } from "@preact/signals";
import useWindowPosition from "../hooks/useWindowPosition.ts";
import { useSignalEffect } from "@preact/signals";

export default function Counter() {
  const bc = new BroadcastChannel("application");
  const uuid = crypto.randomUUID();

  useSignalEffect(() => {
    bc.postMessage(uuid);
  });
  const windowPosition = useWindowPosition();

  const counter = useSignal(0);

  const update = () => {
    bc.postMessage({ command: "keepalive", uuid });
    requestAnimationFrame(update);
  };

  useSignalEffect(update);

  useSignalEffect(() => {
    bc.onmessage = function (ev) {
      if (ev.data.command === "counter_add") {
        counter.value += ev.data.value;
        return;
      }
    };
  });

  return (
    <>
      counter: {counter}

      <pre>{JSON.stringify(windowPosition, null, 2)}</pre>
    </>
  );
}
