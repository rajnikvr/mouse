// server.js
const http = require("http");
const WebSocket = require("ws");
const { mouse, Button } = require("@nut-tree-fork/nut-js");

// Mouse config
mouse.config.mouseSpeed = 800;

// Create plain HTTP server
const server = http.createServer();

// Create WebSocket server on top of HTTP
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log("📩 Received event:", data);

      switch (data.type) {
        case "move": {
          const { dx, dy } = data;
          const pos = await mouse.getPosition();
          const newPos = { x: pos.x + dx, y: pos.y + dy };
          await mouse.setPosition(newPos);
          break;
        }
        case "click":
          await mouse.click(Button.LEFT);
          break;
        case "rightClick":
          await mouse.click(Button.RIGHT);
          break;
        case "scroll": {
          const { amount } = data;
          if (amount > 0) await mouse.scrollDown(amount);
          else await mouse.scrollUp(Math.abs(amount));
          break;
        }
        default:
          console.log("⚠️ Unknown event:", data.type);
      }
    } catch (err) {
      console.error("❌ Error handling message:", err);
    }
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

// Listen on port 3030
server.listen(3030, () => {
  console.log("✅ WebSocket server running at ws://localhost:3030");
});
