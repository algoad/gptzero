const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const WebSocket = require("ws");
const RRML2HTML = require("./utils/RRML2HTML");

const PORT = 8081;
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  ws.on("message", async (message) => {
    try {
      getRichieRichResponse(message, (partialResponse) => {
        ws.send(partialResponse);
      });
    } catch (error) {
      ws.send("Error getting response from RichieRich");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

let buffer = "";

async function getRichieRichResponse(prompt, onPartialMessage) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:8082/v1/stream");
    let response = "";
    let timeout;

    const resetTimeout = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        ws.close();
      }, 1000);
    };

    ws.on("open", () => {
      ws.send(prompt);
    });

    ws.on("message", (data) => {
      buffer += data.toString();

      let startTagMatch;
      let endTagMatch;

      const tagPattern = /<([a-z]+)(?:\s[^>]*)?>(.*?)<\/\1>/gi;

      while ((startTagMatch = buffer.match(tagPattern)) !== null) {
        const fullTag = startTagMatch[0];

        const endTagIndex = buffer.indexOf(fullTag) + fullTag.length;
        const responseHTML = RRML2HTML(fullTag);
        onPartialMessage(responseHTML);
        buffer = buffer.slice(endTagIndex);
      }
      resetTimeout();
    });

    ws.on("close", () => {
      console.log("CLOSING");
      resolve();
    });

    ws.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  getRichieRichResponse,
};
