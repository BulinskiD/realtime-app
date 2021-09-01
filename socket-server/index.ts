import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { gamesController } from "./rest/controllers/gamesController";
import { createSocket } from "./websocket";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/games", gamesController);

const server = createSocket(app);

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
