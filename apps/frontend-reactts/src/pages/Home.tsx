import { useContext, useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';
import Header from '../components/Header';

type AdminTournament = {
  tournamentId: number;
  tournamentName: string;
  tournamentStatus: string;
};

type PlayerInfo = {
  playerId: number;
  status: 'Apto' | 'Ausente' | 'Lesionado'
};

type AddPlayerInfo = {
  userId: number;
  status: 'Apto' | 'Ausente' | 'Lesionado'
};

type LoginInfo = {
  email: string;
  token: string
};

type NewTournamentInputs = {
  newTournamentName: string;
  newTournamentPrize: number;
};

const getLoginInfo = (): LoginInfo => {
  const login = localStorage.getItem('login');
  const loginInfo = login ? JSON.parse(login) : { token: '' };
  return loginInfo;
};

const getUserPlayerInfo = async (userId: number, token: string):
Promise<PlayerInfo | undefined> => {
  try {
    const response = await fetch(`http://localhost:8080/player/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return undefined;
    }
    const data: PlayerInfo = await response.json();
    return data;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
};

const getPlayerTournaments = async (playerId: number): Promise<AdminTournament[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/player/${playerId}/tournaments`,
      { method: 'GET' },
    );
    const data: AdminTournament[] = await response.json();
    return data;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};

const getUserTournaments = async (userId: number, token: string):
Promise<AdminTournament[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/${userId}/tournaments`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: AdminTournament[] = await response.json();
    return data;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};

// adicionar autorizacao
const addTournament = async (newTournament: NewTournamentInputs, userId: number):
Promise <boolean > => {
  try {
    const response = await fetch('http://localhost:8080/tournament', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newTournament.newTournamentName,
        status: 'Não iniciado',
        prizeMoney: newTournament.newTournamentPrize,
        userId,
      }),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar torneio');
    }
    return response.ok;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return false;
  }
};

// adicionar autorizacao
const addAsPlayer = async (addPlayerInfo: AddPlayerInfo): Promise <PlayerInfo | undefined > => {
  try {
    const response = await fetch('http://localhost:8080/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addPlayerInfo),
    });
    if (response.ok) {
      const data = await response.json();
      const { playerId, status } = data;
      return { playerId, status };
    }
    return undefined;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};

function Home(): JSX.Element {
  const appContext = useContext(AppContext);
  const { context, setContext } = appContext;
  const [adminTournaments, setAdminTournaments] = useState<AdminTournament[]>([]);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | undefined>();
  const [playerTournaments, setPlayerTournaments] = useState<AdminTournament[]>([]);
  const [newTournamentInputs, setNewTournamentInputs] = useState<NewTournamentInputs>({
    newTournamentName: '',
    newTournamentPrize: 0,
  });
  const [addAsPlayerInput, setAddAsPlayerInput] = useState<string>('');
  const { user, token } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { setContext({ ...context, token: getLoginInfo().token }); }
    if (!user) {
      navigate('/login');
    }
    async function fetchData() {
      if (user && token) {
        const { userId } = user;
        const userAdminTournaments:
        AdminTournament[] | undefined = await getUserTournaments(userId, token);
        if (userAdminTournaments) {
          setAdminTournaments(userAdminTournaments);
        }
        const userPlayerInfo: PlayerInfo | undefined = await getUserPlayerInfo(userId, token);
        if (userPlayerInfo) {
          setPlayerInfo(userPlayerInfo);
        }
      }
    }
    fetchData();
  }, [context, setContext, token, user, navigate]);

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

  const handleNewTournamentInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setNewTournamentInputs({ ...newTournamentInputs, [name]: value });
  };

  const handleAddTournamentButton = async (): Promise<void> => {
    const addTournamentResponse = await addTournament(newTournamentInputs, user!.userId);
    if (addTournamentResponse) {
      setNewTournamentInputs({
        newTournamentName: '',
        newTournamentPrize: 0,
      });
    }
  };

  const handleAddAsPlayerButton = async (): Promise<void> => {
    if (user && (addAsPlayerInput === 'Apto' || addAsPlayerInput === 'Ausente' || addAsPlayerInput === 'Lesionado')) {
      const addAsPlayerResponse = await addAsPlayer(
        { status: addAsPlayerInput, userId: user!.userId },
      );
      if (addAsPlayerResponse) {
        setPlayerInfo(addAsPlayerResponse);
        setAddAsPlayerInput('');
      }
    }
  };

  const { newTournamentName, newTournamentPrize } = newTournamentInputs;
  return (
    <>
      <Header />
      <h1>Jogador</h1>
      {!playerInfo ? (
        <div>
          <h2>Usuário não está cadastrado como jogador</h2>
          <h3> Cadastrar como jogador:</h3>
          <select
            value={addAsPlayerInput}
            onChange={(event) => setAddAsPlayerInput(event.target.value)}
          >
            <option value="" disabled>Selecione o status</option>
            <option value="Apto">Apto</option>
            <option value="Ausente">Ausente</option>
            <option value="Lesionado">Lesionado</option>
          </select>
          <button type="button" onClick={handleAddAsPlayerButton}>Cadastrar</button>
        </div>
      ) : (
        <div>
          <h2>{playerInfo.playerId}</h2>
          <p>{playerInfo.status}</p>
        </div>
      ) }
      <h1>Torneios administrados</h1>
      {adminTournaments.length === 0 ? (<h2>Nenhum torneio disponível</h2>) : (
        <div>
          {adminTournaments.map((tournament) => (
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
      <h1>Adicionar torneio</h1>
      <form>
        <label htmlFor="newTournamentName">
          Nome do torneio:
          <input type="text" autoComplete="name" id="newTournamentName" name="newTournamentName" value={newTournamentName} placeholder="Digite o nome" onChange={handleNewTournamentInputs} />
        </label>
        <label htmlFor="newTournamentPrize">
          Prêmio:
          <input type="number" autoComplete="additional-name" id="newTournamentPrize" name="newTournamentPrize" value={newTournamentPrize} placeholder="Digite o sobrenome" onChange={handleNewTournamentInputs} />
        </label>
      </form>
      <button type="submit" onClick={handleAddTournamentButton}>Cadastrar</button>
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

export default Home;
