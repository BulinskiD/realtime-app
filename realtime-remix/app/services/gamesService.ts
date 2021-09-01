import { httpService } from "../services/http";

export const gamesService = {
  getAll: () => httpService.get("games"),
  create: (userName: string) => httpService.post<{ userName: string }, { gameId: string }>("games", { userName }),
};
