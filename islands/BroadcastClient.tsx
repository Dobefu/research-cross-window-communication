import { useSignal } from "@preact/signals";

export default function Counter() {
  const counter = useSignal(0);

  const bc = new BroadcastChannel("application");

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
    </>
  );
}
