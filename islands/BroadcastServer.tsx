import { Button } from "../components/Button.tsx";
import useWindowPosition from "../hooks/useWindowPosition.ts";
import { useSignal, useSignalEffect } from "@preact/signals";

export default function Counter() {
  const bc = new BroadcastChannel("application");
  const clients = useSignal<Record<string, { uuid: string; age: number }>>({});

  const windowPosition = useWindowPosition();

  const update = () => {
    Object.keys(clients.value).forEach((clientKey) => {
      clients.value[clientKey].age += 1;

      if (clients.value[clientKey].age >= 100) {
        delete clients.value[clientKey];
      }
    });

    requestAnimationFrame(update);
  };

  useSignalEffect(update);

  bc.onmessage = function (ev) {
    if (ev.data.command === "keepalive") {
      clients.value[ev.data.uuid] = { uuid: ev.data.uuid, age: 0 };

      return;
    }

    console.log(ev);
  };

  return (
    <div class="flex flex-col gap-8">
      <Button
        onClick={() => bc.postMessage({ command: "counter_add", value: 1 })}
      >
        Send message
      </Button>

      <pre>{JSON.stringify(windowPosition, null, 2)}</pre>

      <p class="text-lg font-semibold">Clients:</p>

      {Object.entries(clients.value).map(([clientKey, client]) => {
        return (
          <p>
            <h2 class="font-semibold">{clientKey}</h2>
            <pre>{JSON.stringify(client, null, 2)}</pre>
          </p>
        );
      })}
    </div>
  );
}
