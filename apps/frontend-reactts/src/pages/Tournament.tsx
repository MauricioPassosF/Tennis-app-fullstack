import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

type TournamentInfo = {
  tournamentId: number;
  tournamentName: string;
  tournamentStatus: string;
  prizeMoney: number;
  admFirstName: string;
  admLastName: string;
};

type TournamentError = {
  message: string;
};

type TournamentGame = {
  gameId: number;
  gameStatus: string;
  playerAScore: number;
  playerBScore: number;
  playerAFirstName: string;
  playerALastName: string;
  playerBFirstName: string;
  playerBLastName: string;
};

type AddGame = {
  playerAScore: number;
  playerBScore: number;
  playerAId: number;
  playerBId: number;
  Status: string;
  TournamentId: number;
};

const getTournamentInfo = async (tournamentId: number): Promise<TournamentInfo | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/tournament/${tournamentId}`,
      { method: 'GET' },
    );
    const data: TournamentInfo | TournamentError = await response.json();
    const { message } = data as TournamentError;
    if (message) {
      throw new Error(message);
    }
    return data as TournamentInfo;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const getTournamentGames = async (tournamentId: number): Promise<TournamentGame[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/tournament/${tournamentId}/games`,
      { method: 'GET' },
    );
    const data: TournamentGame[] | TournamentError = await response.json();
    const { message } = data as TournamentError;
    if (message) {
      throw new Error(message);
    }
    return data as TournamentGame[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const initialNewGameInfo = {
  playerAScore: 0,
  playerBScore: 0,
  playerAId: 0,
  playerBId: 0,
  Status: 'Agendada',
};

const addGame = async (
  newGameInfo: AddGame,
  // setNewGameInfo: (value: React.SetStateAction<AddGame>) => void,
)
: Promise<boolean | undefined> => {
  try {
    const response = await fetch('http://localhost:8080/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGameInfo),
    });
    console.log(response);
    return response.ok;
    // if (response.ok) {
    //   const data = await response.json();
    //   setNewGameInfo({ ...initialNewGameInfo, TournamentId: newGameInfo.TournamentId });
    //   console.log(data);
    // }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

function Tournament(): JSX.Element {
  const location = useLocation();
  const tournamentId = useMemo(() => Number(location.pathname.split('/')[2]), [location]);
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | undefined>(undefined);
  const [tournamentGames, setTournamentGames] = useState<TournamentGame[]>([]);
  const [addPlayerActive, setAddPlayerActive] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [newGameInfo, setNewGameInfo] = useState<AddGame>({
    ...initialNewGameInfo,
    TournamentId: tournamentId,
  });
  const { playerAId, playerBId } = newGameInfo;
  useEffect(() => {
    async function fetchData() {
      const tournamentData: TournamentInfo | undefined = await getTournamentInfo(tournamentId);
      const GamesData: TournamentGame[] | undefined = await getTournamentGames(tournamentId);
      if (tournamentData) {
        setTournamentInfo(tournamentData);
      }
      if (GamesData) {
        setTournamentGames(GamesData);
      }
    }
    fetchData();
  }, [refresh, tournamentId]);

  const handleNewGameInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setNewGameInfo({ ...newGameInfo, [name]: value });
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
        <button type="button" onClick={() => setAddPlayerActive(true)}>Adicionar Jogo</button>
        {addPlayerActive && (
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
            <button
              type="submit"
              onClick={async () => {
                const responseStatus = await addGame(newGameInfo);
                if (responseStatus) {
                  setAddPlayerActive(false);
                  setNewGameInfo({ ...initialNewGameInfo, TournamentId: tournamentId });
                  setRefresh(!refresh);
                }
              }}
            >
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
    </div>
  );
}

export default Tournament;
