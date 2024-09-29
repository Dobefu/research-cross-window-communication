import { useSignal } from "@preact/signals";
import useWindowPosition from "../hooks/useWindowPosition.ts";

export default function Counter() {
  const bc = new BroadcastChannel("application");

  const windowPosition = useWindowPosition();

  const counter = useSignal(0);

  bc.onmessage = function (ev) {
    if (ev.data.command === "counter_add") {
      counter.value += ev.data.value;
      return;
    }

    console.log(ev);
  };

  return (
    <>
      counter: {counter}

      <pre>{JSON.stringify(windowPosition, null, 2)}</pre>
    </>
  );
}
