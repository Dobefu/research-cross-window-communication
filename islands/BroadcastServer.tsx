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

  const { getWindowPosition } = useWindowPosition();
  const windowPosition = useSignal<
    ReturnType<typeof getWindowPosition> | object
  >({});

  const update = () => {
    windowPosition.value = getWindowPosition();

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

            <div
              class="fixed"
              style={{
                backgroundColor: `#${client.uuid.slice(0, 6)}`,
                // @ts-expect-error TODO Fix later.
                top: client.windowPosition.top - windowPosition.value.top,
                // @ts-expect-error TODO Fix later.
                left: client.windowPosition.left - windowPosition.value.left,
                // @ts-expect-error TODO Fix later.
                width: client.windowPosition.width,
                // @ts-expect-error TODO Fix later.
                height: client.windowPosition.height,
              }}
            />
          </p>
        );
      })}
    </div>
  );
}
