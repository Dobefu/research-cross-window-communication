export default function Home() {
  return (
    <div class="flex flex-col gap-8 text-center items-center">
      Open both in separate tabs/ windows

      <div class="flex gap-8">
        <a class="text-sky-600" href="/server">Server</a>
        <a class="text-sky-600" href="/client">Client</a>
      </div>
    </div>
  );
}
