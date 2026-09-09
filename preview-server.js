const http = require("node:http")
const { URL } = require("node:url")

const port = Number(process.env.PORT || 3000)

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ASP.NET Core Web Service</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: #f5f7fb; color: #172033; }
    main { width: min(100% - 32px, 760px); margin: 0 auto; padding: 72px 0 40px; }
    .eyebrow { color: #5267d9; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
    h1 { margin: 12px 0; font-size: clamp(32px, 8vw, 54px); line-height: 1.05; letter-spacing: -.04em; }
    p { color: #596579; font-size: 17px; line-height: 1.6; }
    section { margin-top: 32px; padding: 24px; border: 1px solid #e1e6f0; border-radius: 18px; background: #fff; box-shadow: 0 16px 50px rgba(34, 48, 87, .08); }
    label { display: block; margin-bottom: 8px; color: #344054; font-size: 14px; font-weight: 650; }
    .row { display: flex; gap: 10px; }
    input { min-width: 0; flex: 1; border: 1px solid #ccd4e2; border-radius: 10px; padding: 13px 14px; font: inherit; }
    button { border: 0; border-radius: 10px; padding: 0 18px; background: #5267d9; color: white; font: inherit; font-weight: 700; cursor: pointer; }
    pre { min-height: 48px; margin: 20px 0 0; padding: 14px; overflow: auto; border-radius: 10px; background: #172033; color: #dbe4ff; }
    @media (max-width: 480px) { main { padding-top: 44px; } .row { flex-direction: column; } button { min-height: 46px; } }
  </style>
</head>
<body>
  <main>
    <div class="eyebrow">Service preview</div>
    <h1>ASP.NET Core Web Service</h1>
    <p>A lightweight preview surface for the existing hello endpoint. Enter a name to test the same response contract exposed by the service.</p>
    <section>
      <label for="name">Name</label>
      <div class="row">
        <input id="name" value="World" autocomplete="off" />
        <button id="send" type="button">Call endpoint</button>
      </div>
      <pre id="result">{ "output": "Hello World!" }</pre>
    </section>
  </main>
  <script>
    const input = document.querySelector('#name')
    const result = document.querySelector('#result')
    document.querySelector('#send').addEventListener('click', async () => {
      const name = input.value.trim() || 'World'
      result.textContent = JSON.stringify({ output: 'Hello ' + name + '!' }, null, 2)
    })
  </script>
</body>
</html>`

http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  if (url.pathname === "/") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" })
    response.end(page)
    return
  }
  response.writeHead(404, { "content-type": "application/json" })
  response.end(JSON.stringify({ error: "Not found" }))
}).listen(port, "0.0.0.0", () => {
  console.log(`Preview server listening on ${port}`)
})
