// server.js
const WebSocket = require("ws");
const { mouse, Button } = require("@nut-tree-fork/nut-js");

// Configure mouse speed if needed
mouse.config.mouseSpeed = 949.3;

const wss = new WebSocket.Server({ port: 3030 });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log("Received event:", data);

      switch (data.type) {
        case "move": {
          const { dx, dy } = data;
          const pos = await mouse.getPosition();
          const newPos = { x: pos.x + dx, y: pos.y + dy };
          console.log(`Moving mouse to: ${newPos.x}, ${newPos.y}`);
          await mouse.setPosition(newPos);
          break;
        }

        case "click": {
          console.log("Left click");
          await mouse.click(Button.LEFT);
          break;
        }

        case "rightClick": {
          console.log("Right click");
          await mouse.click(Button.RIGHT);
          break;
        }

        case "scroll": {
          const { amount } = data;
          console.log(`Scrolling down by ${amount}`);
          await mouse.scrollDown(amount);
          break;
        }

        default:
          console.log("Unknown event type:", data.type);
      }
    } catch (err) {
      console.error("Error handling message:", err);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});
