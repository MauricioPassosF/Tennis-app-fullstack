import { useEffect, useState } from 'react';
import { getTournamentGames } from '../../services/fetchs/fetchTournament';
import { TournamentGame } from '../../types/Tournament';
import { IInfosProps } from '../../interfaces/TournamentInterfaces';

export default function TournamentGames({ infosProps }:IInfosProps): JSX.Element {
  const { refresh, tournamentId } = infosProps;
  const [tournamentGames, setTournamentGames] = useState<TournamentGame[]>([]);
  useEffect(() => {
    async function fetchData() {
      const gamesData: TournamentGame[] | undefined = await getTournamentGames(tournamentId);
      if (gamesData) {
        setTournamentGames(gamesData);
      }
    }
    fetchData();
  }, [refresh, tournamentId]);

  return (
    <div>
      {tournamentGames.length === 0 ? <h2>Nenhum jogo disponível</h2> : (
        <div>
          {tournamentGames.map((game) => (
            <div key={game.gameId}>
              <h2>{`${game.playerAFirstName} ${game.playerALastName} x ${game.playerBFirstName} ${game.playerBLastName}`}</h2>
              <p>{`Status: ${game.gameStatus}`}</p>
              <p>{`Placar: ${game.playerAScore} x ${game.playerBScore}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
