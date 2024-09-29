import useWindowPosition from "../hooks/useWindowPosition.ts";
import { useSignal, useSignalEffect } from "@preact/signals";

export default function Counter() {
  const bc = new BroadcastChannel("application");
  const clients = useSignal<
    Record<
      string,
      {
        uuid: string;
        age: number;
        windowPosition: typeof windowPosition;
      }
    >
  >({});

  const windowPosition = useWindowPosition();

  const update = () => {
    Object.keys(clients.value).forEach((clientKey) => {
      clients.value[clientKey].age += 1;

      if (clients.value[clientKey].age >= 360) {
        delete clients.value[clientKey];
      }
    });

    requestAnimationFrame(update);
  };

  useSignalEffect(update);

  useSignalEffect(() => {
    bc.onmessage = function (ev) {
      if (ev.data.command === "ping") {
        clients.value[ev.data.uuid] = {
          uuid: ev.data.uuid,
          age: 0,
          windowPosition: ev.data.value,
        };

        return;
      }

      console.log(`Unhandled event: ${ev}`);
    };
  });

  return (
    <div class="flex flex-col gap-8">
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
