import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  addPlayer, getTournamentGames, getTournamentInfo, getTournamentPlayers,
} from '../services/fetchs/fetchTournament';
import { TournamentGame, TournamentInfo, TournamentPlayer } from '../types/Tournament';
import { AddPlayerInTournament } from '../types/Player';
import { AddGame } from '../types/Game';
import addGame from '../services/fetchs/fetchGame';

type EditTournament = 'AddGame' | 'AddPlayer' | 'Edit' | 'Delete' | '';

const initialNewGameInfo = {
  playerAScore: 0,
  playerBScore: 0,
  playerAId: 0,
  playerBId: 0,
  Status: 'Não agendado',
};

function Tournament(): JSX.Element {
  const location = useLocation();
  const tournamentId = useMemo(() => Number(location.pathname.split('/')[2]), [location]);
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | undefined>(undefined);
  const [tournamentGames, setTournamentGames] = useState<TournamentGame[]>([]);
  const [tournamentPlayers, setTournamentPlayers] = useState<TournamentPlayer[]>([]);
  const [editTournament, setEditTournament] = useState<EditTournament>('');
  const [refresh, setRefresh] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<AddPlayerInTournament>({
    playerId: 0, TournamentId: tournamentId,
  });
  const [newGameInfo, setNewGameInfo] = useState<AddGame>({
    ...initialNewGameInfo,
    TournamentId: tournamentId,
  });
  const { playerAId, playerBId } = newGameInfo;
  useEffect(() => {
    async function fetchData() {
      const tournamentData: TournamentInfo | undefined = await getTournamentInfo(tournamentId);
      const gamesData: TournamentGame[] | undefined = await getTournamentGames(tournamentId);
      const playersData: TournamentPlayer[] | undefined = await getTournamentPlayers(tournamentId);
      if (tournamentData) {
        setTournamentInfo(tournamentData);
      }
      if (gamesData) {
        setTournamentGames(gamesData);
      }
      if (playersData) {
        setTournamentPlayers(playersData);
      }
    }
    fetchData();
  }, [refresh, tournamentId]);

  const handleNewGameInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setNewGameInfo({ ...newGameInfo, [name]: value });
  };

  const handleAddNewGameButton = async (): Promise<void> => {
    const responseAddNewGame = await addGame(newGameInfo);
    if (responseAddNewGame) {
      setEditTournament('');
      setNewGameInfo({ ...initialNewGameInfo, TournamentId: tournamentId });
      setRefresh(!refresh);
    }
  };

  const handleAddNewPlayerButton = async (): Promise<void> => {
    const responseAddNewPlayer = await addPlayer(newPlayer);
    if (responseAddNewPlayer) {
      setEditTournament('');
      setRefresh(!refresh);
    }
  };

  return (
    <div>
      <div>
        {!tournamentInfo
          ? <h1>Loading ...</h1>
          : (
            <div>
              <h1>{tournamentInfo.tournamentName}</h1>
              <p>{`Status: ${tournamentInfo.tournamentStatus}`}</p>
              <p>{`Prêmios: R$ ${tournamentInfo.prizeMoney}`}</p>
            </div>
          )}
      </div>
      <div>
        <button type="button" onClick={() => setEditTournament('AddGame')}>Adicionar Jogo</button>
        <button type="button" onClick={() => setEditTournament('AddPlayer')}>Adicionar Jogador</button>
        <button type="button" onClick={() => setEditTournament('Edit')}>Editar</button>
        <button type="button" onClick={() => setEditTournament('Delete')}>Excluir</button>
        {editTournament === 'AddGame' && (
          <div>
            <form>
              <label htmlFor="playerAId">
                Digite Id do jogador A:
                <input type="number" name="playerAId" onChange={handleNewGameInfo} value={playerAId} />
              </label>
              <label htmlFor="playerBId">
                Digite Id do jogador B:
                <input type="number" name="playerBId" onChange={handleNewGameInfo} value={playerBId} />
              </label>
            </form>
            <button type="submit" onClick={handleAddNewGameButton}>
              Adicionar
            </button>
          </div>
        )}
        {editTournament === 'AddPlayer' && (
          <div>
            <form>
              <label htmlFor="playerId">
                Digite Id do jogador:
                <input type="number" name="playerId" onChange={(event) => setNewPlayer({ ...newPlayer, playerId: Number(event.target.value) })} value={newPlayer.playerId} />
              </label>
            </form>
            <button type="submit" onClick={handleAddNewPlayerButton}>
              Adicionar
            </button>
          </div>
        )}
      </div>
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
    </div>
  );
}

export default Tournament;
