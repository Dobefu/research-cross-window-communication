import { Button } from "../components/Button.tsx";
import useWindowPosition from "../hooks/useWindowPosition.ts";

export default function Counter() {
  const bc = new BroadcastChannel("application");

  const windowPosition = useWindowPosition();

  return (
    <>
      <Button
        onClick={() => bc.postMessage({ command: "counter_add", value: 1 })}
      >
        Send message
      </Button>

      <pre>{JSON.stringify(windowPosition, null, 2)}</pre>
    </>
  );
}
