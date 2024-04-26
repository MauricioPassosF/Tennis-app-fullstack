import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminTournament } from '../../types/Tournament';
import { getPlayerTournaments } from '../../services/fetchs/fetchPlayer';
import { IPlayerInfoState } from '../../interfaces/HomeInterfaces';

export default function PlayerTournaments({ playerInfoState }: IPlayerInfoState): JSX.Element {
  const { playerInfo } = playerInfoState;
  const [playerTournaments, setPlayerTournaments] = useState<AdminTournament[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (playerInfo && typeof playerInfo.playerId === 'number') {
        const userPlayerTournaments:
        AdminTournament[] | undefined = await getPlayerTournaments(playerInfo.playerId);
        if (userPlayerTournaments) {
          setPlayerTournaments(userPlayerTournaments);
        }
      }
    }
    fetchData();
  }, [playerInfo]);

  return (
    <>
      <h1>Torneios participando</h1>
      {playerTournaments.length === 0 ? (<h2>Nenhum torneio disponível</h2>) : (
        <div>
          {playerTournaments.map((tournament) => (
            <div key={tournament.tournamentId}>
              <h2>{tournament.tournamentName}</h2>
              <p>{tournament.tournamentStatus}</p>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
              <button
                type="button"
                onClick={() => navigate(`/tournament/${tournament.tournamentId}`)}
              >
                Mais detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
