import { Button } from "../components/Button.tsx";

export default function Counter() {
  const bc = new BroadcastChannel("test_channel");

  bc.onmessage = function (ev) {
    console.log(ev);
  };

  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => bc.postMessage("Test message")}>
        Send message
      </Button>
    </div>
  );
}
