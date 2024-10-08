import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Research - Cross Window Communication</title>

        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main class="m-8" id="main-content">
          <Component />
        </main>
      </body>
    </html>
  );
}
