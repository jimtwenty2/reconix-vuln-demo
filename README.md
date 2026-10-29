# reconix-vuln-demo (Acme Notes)

> **Warning:** this app is intentionally vulnerable. Do not deploy it or reuse its code.
> All secrets in it are fake.

A small Node.js notes app with planted security flaws, made for testing the
**Reconix-Scanner** VS Code extension.

## How to scan it
1. Install the Reconix-Scanner extension in VS Code:
   **Extensions** view → **`...`** menu → **Install from VSIX...** → choose the `.vsix` file.
2. Clone this repo:
   ```bash
   git clone https://github.com/jimtwenty2/reconix-vuln-demo.git
   ```
3. In VS Code, use **File → Open Folder...** and open the `reconix-vuln-demo` folder.
4. Click the **shield icon** in the left sidebar to open the Vuln Scanner chat, then start a scan.

Scan the code as cloned. If you edit the files, the results may no longer line up with them.

## Run the app (optional)
You don't need to run the app to scan it. To try it anyway (Node.js 22 or later):
```bash
npm install
npm start    # http://localhost:3000
```
Test logins: `admin / admin123`, `alice / wonderland`, `bob / builder`.
