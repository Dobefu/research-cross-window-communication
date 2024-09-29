import { Button } from "../components/Button.tsx";

export default function Counter() {
  const bc = new BroadcastChannel("application");

  return (
    <>
      <Button
        onClick={() => bc.postMessage({ command: "counter_add", value: 1 })}
      >
        Send message
      </Button>
    </>
  );
}
