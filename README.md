# reconix-vuln-demo (Acme Notes)

> **Intentionally vulnerable. Do not deploy, expose to a network, or reuse this code.**
> Every secret in this repository is fake.

Acme Notes is a small Express + SQLite notes API. It is the demo target for the
**Reconix-Scanner** VS Code extension. The code contains deliberate security flaws: injection,
unsafe file and process handling, weak crypto, leaked secrets, and outdated dependencies with
known advisories. A few safe patterns also look risky to scanners, so the demo has false
positives too.

## Use it with Reconix-Scanner
1. Clone this repo next to the extension:
   ```
   Reconix-Project-Advanced-Course/
   ├─ reconix-vscode-extension/
   └─ reconix-vuln-demo/          ← this repo
   ```
2. Open the extension repo in VS Code and press **F5** ("Run Extension"). The development
   host opens this folder.
3. In the **Vuln Scanner** chat, scan the workspace.
   - **Static mode** (`vulnScanner.dataSource = "static"`) shows findings recorded from a real
     scan of this exact code.
   - **Server mode** scans it live.

The static findings point at exact files and lines in this repo. If you change the code here,
regenerate them from the extension repo:
```bash
sh scripts/scan-demo.sh ../reconix-vuln-demo
node scripts/gen-static-findings.mjs
```

## Run the app (optional)
Requires Node 22 or later.
```bash
npm install
npm start          # http://localhost:3000, binds to all interfaces, so keep it on a trusted machine
```
Seeded users: `admin / admin123`, `alice / wonderland`, `bob / builder`.

The answer key (what is planted where) is kept in the extension repo
(`src/static/groundTruth.json`). That keeps it out of the scanned workspace, so no scanner or
AI can read the answers.
