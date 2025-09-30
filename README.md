# 🖱️ Remote Mouse Controller — Setup & Deployment Guide (Android Users Only)

This README walks **Android users** step-by-step through setting up the project server (Node.js + nut.js), exposing it securely via **ngrok**, and running it continuously with **PM2**. It also covers connecting from the React Native mobile app.

> **Goal:** Run `server.js` on your desktop/server so your **Android phone** can connect over `wss://` and control the mouse (move, click, scroll).

---

## 🔎 Prerequisites

- Basic familiarity with the terminal / PowerShell.
- A Windows/Linux machine for the server (nut.js supported).
- An **Android phone** with the React Native client installed.
- Internet connection (for ngrok tunnel).

---

## 1. Install Node.js (LTS recommended)

1. Download and install from https://nodejs.org/ (choose the LTS version, e.g. Node 18+).
2. Verify installation:

```bash
node -v
npm -v
```

---

## 2. Clone the repo and install dependencies

```bash
# from your projects folder
git clone <your-repo-url>
cd <repo-folder>

# install dependencies
npm install
npm install ws @nut-tree-fork/nut-js
```

---

## 3. Test run the server locally

```bash
node server.js
```

Expected output:
```
✅ WebSocket server running at ws://localhost:3030
```

---

## 4. Install & use PM2 (keep server alive)

```bash
npm install -g pm2
pm2 start server.js --name remote-mouse
pm2 status
pm2 logs remote-mouse --lines 200
```

### Restart on reboot (Linux)
```bash
pm2 save
pm2 startup
```

### Restart on reboot (Windows)
For Windows, use [`pm2-windows-service`](https://www.npmjs.com/package/pm2-windows-service) or keep PM2 inside WSL.

---

## 5. Install & configure ngrok (public tunnel)

1. Sign up at https://ngrok.com and copy your **authtoken**.
2. Download ngrok for your OS.
3. Authenticate:

```bash
ngrok authtoken <AUTHTOKEN>
```

4. Start a tunnel:
```bash
ngrok http 3030
```

Output will include something like:
```
Forwarding  https://abcd1234abcd.ngrok-free.app -> http://localhost:3030
```

Use **`abcd1234abcd.ngrok-free.app`** in your mobile app.

---

## 6. Connect Android app

On your phone:
- Open the React Native app.
- Enter only the **host part** (no `https://`) e.g. `abcd1234abcd.ngrok-free.app`.
- Tap **Save & Connect**.

The app automatically creates `wss://abcd1234abcd.ngrok-free.app`.

---

## 7. Troubleshooting (Android)

**Error: Not connecting**
- Ensure ngrok is running.
- Double-check you entered only the hostname, no protocol.
- Run `pm2 logs remote-mouse` for errors.

**Nut.js issues**
- Windows: run server as Administrator.
- Linux: install required X11/uinput libs.

**ngrok URL changes**
- Free tunnels rotate each time. For a static address, upgrade ngrok plan or self-host.

---

## 8. Useful PM2 commands

```bash
pm2 start server.js --name remote-mouse
pm2 restart remote-mouse
pm2 stop remote-mouse
pm2 delete remote-mouse
pm2 logs remote-mouse --lines 200
```

---

## ✅ Wrap-up

- Install Node.js
- Run server with PM2
- Expose with ngrok
- Enter ngrok hostname into Android app
- Control mouse remotely 🎉