import { useEffect } from 'react';
import { getTournamentPlayers } from '../../services/fetchs/fetchTournament';
import { TournamentPlayer } from '../../types/Tournament';
import { IInfosPlayers } from '../../interfaces/TournamentInterfaces';

export default function TournamentPlayers(props: IInfosPlayers): JSX.Element {
  const { playersProps, infosProps } = props;
  const { refresh, tournamentId } = infosProps;
  const { tournamentPlayers, setTournamentPlayers } = playersProps;
  useEffect(() => {
    async function fetchData() {
      const playersData: TournamentPlayer[] | undefined = await getTournamentPlayers(tournamentId);
      if (playersData) {
        setTournamentPlayers(playersData);
      }
    }
    fetchData();
  }, [refresh, tournamentId, setTournamentPlayers]);

  return (
    <div>
      {tournamentPlayers.length === 0 ? <h2>Nenhum jogador disponível</h2> : (
        <div>
          {tournamentPlayers.map((player) => (
            <div key={player.playerId}>
              <h2>{`${player.firstName} ${player.lastName}`}</h2>
              <p>{`Status: ${player.status}`}</p>
              <p>{`Email: ${player.email}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
