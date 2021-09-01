import http from "http";
import { Server } from "socket.io";
import { Express } from "express";
import { gameService } from "../services/gameService";

export function createSocket(app: Express) {
  const messages: string[] = [];

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  const gamesSocket = io.of(/\/game\/([^\/ \s]+)$/);

  gamesSocket.on("connection", (socket) => {
    const id = socket.nsp.name.replace("/game/", "");
    try {
      const game = gameService.get(id);
      socket.join(id);

      socket.emit("game:state", game);

      socket.on("game:joinUser", (userName) => {
        gameService.put(id, { user2: userName });
        gamesSocket.to(id).emit("game:state", gameService.get(id));
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      socket.disconnect(true);
    }
  });

  io.on("connection", (socket) => {
    socket.emit("msg:get", messages);

    socket.on("msg:post", (data) => {
      messages.push(data);
      io.emit("msg:get", messages);
    });
  });

  return server;
}
