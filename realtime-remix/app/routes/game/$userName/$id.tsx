import { useParams } from "react-router-dom";
import * as React from "react";
import { wsService } from "../../../services/wsService";
import { Game } from "../../../../../socket-server/services/gameService";
import { useUsername } from "../../../utils/useUsername";

export default function GameBoard() {
  const userName = useUsername();
  const [game, setGame] = React.useState<Game | null>(null);
  const { id } = useParams();
  const gameSocket = React.useMemo(() => wsService.getGameConnection(id), [id]);

  React.useEffect(() => {
    gameSocket.on("game:state", setGame);
  }, [gameSocket]);

  React.useEffect(() => {
    if (game && game.user1 !== userName && game.user2 !== userName) {
      gameSocket.emit("game:joinUser", userName);
    }
  }, [game, userName]);

  return (
    <div>
      {game?.user1} {game?.user2}
    </div>
  );
}
