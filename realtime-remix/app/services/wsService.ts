import { io } from "socket.io-client";

const socket = io(`http://localhost:5000`);

export const wsService = {
  getGameConnection: (id: string) => io(`http://localhost:5000/game/${id}`),
};
