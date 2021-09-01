import { v4 as uuid } from "uuid";

export interface Game {
  user1: string;
  user2: string | null;
}

export interface GameWithId extends Game {
  id: string;
}

class GameService {
  constructor() {
    this.games = {};
  }

  private readonly games: {
    [key: string]: Game;
  };

  get(id: string): Game {
    const game = this.games[id];
    if (game) {
      return game;
    }

    throw new Error(`Game with id:${id} has not been found`);
  }

  getAll(): GameWithId[] {
    return Object.entries(this.games).map(([id, game]) => ({ ...game, id }));
  }

  create(userName: string): string {
    const id = uuid();
    this.games[id] = { user1: userName, user2: null };
    return id;
  }

  put(id: string, params: Partial<Game>) {
    const game = this.get(id);
    const updatedGame = { ...game, ...params };
    this.games[id] = updatedGame;
    return updatedGame;
  }

  addUser({ userName, id }: { userName: string; id: string }): void {
    const game = this.get(id);
    this.games[id].user2 = userName;
  }
}

export const gameService = new GameService();
