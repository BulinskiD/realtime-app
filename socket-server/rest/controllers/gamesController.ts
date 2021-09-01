import express from "express";
import { gameService, GameWithId } from "../../services/gameService";

const gamesController = express.Router();

gamesController.get<string, void, GameWithId[]>("/", (_, res) => {
  return res.send(gameService.getAll());
});

gamesController.post<string, void, { gameId: string }, { userName: string }>("/", (req, res) => {
  const { userName } = req.body;
  const gameId = gameService.create(userName);
  return res.send({ gameId });
});

export { gamesController };
