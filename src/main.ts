import fastifyStatic from "@fastify/static";
import websocketPlugin from "@fastify/websocket";
import fastify from "fastify";
import path from "path";
import { addChatMessage, getChatMessages } from "./chatService";
import { chatMessageValidator } from "./vadidator";

const server = fastify({ logger: true });

server.register(fastifyStatic, {
  root: path.join(__dirname, "../client/dist"),
});

server.register(websocketPlugin);

server.get("/chat", { websocket: true }, (connection) => {
  connection.socket.on("message", (data) => {
    const rawData = JSON.parse(data.toString());
    try {
      const message = chatMessageValidator.parse(rawData);

      const newMessages = addChatMessage(message);

      for (const client of server.websocketServer.clients) {
        client.send(JSON.stringify(newMessages));
      }
    } catch (error) {
      console.error(error);
    }
  });

  connection.socket.send(JSON.stringify(getChatMessages()));
});

const start = async () => {
  try {
    await server.listen(7777, "0.0.0.0");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
