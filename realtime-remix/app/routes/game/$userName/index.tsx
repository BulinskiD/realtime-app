import { ActionFunction, Link, LoaderFunction, useRouteData } from "@remix-run/react";
import { gamesService } from "../../../services/gamesService";
import { GameWithId } from "../../../../../socket-server/services/gameService";
import { redirect } from "@remix-run/node";
import * as React from "react";
import { useUsername } from "../../../utils/useUsername";

export const loader: LoaderFunction = () => gamesService.getAll();

export const action: ActionFunction = async ({ params }) => {
  console.log(params);
  const { gameId } = await gamesService.create(params.userName);
  return redirect(`/game/${params.userName}/${gameId}`);
};

export default function Games() {
  const userName = useUsername();
  const games = useRouteData<GameWithId[]>();
  return (
    <div>
      <form method="post">
        <button>New Game</button>
      </form>
      {games.map((game) => (
        <Link key={game.id} to={`/game/${userName}/${game.id}`}>
          <button>
            User1: {game.user1} User2: {game.user2 ?? "Free"}
          </button>
        </Link>
      ))}
    </div>
  );
}
