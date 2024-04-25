import {
  useContext, useEffect, useState,
} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import { getUserTournaments } from '../services/fetchs/fetchUser';
import { AdminTournament, NewTournamentInputs } from '../types/Tournament';
import { addAsPlayer, getPlayerTournaments, getUserPlayerInfo } from '../services/fetchs/fetchPlayer';
import { PlayerInfo } from '../types/Player';
import { addTournament } from '../services/fetchs/fetchTournament';
import getLoginInfo from '../services/localStorage';

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
  const [shouldFetchUserdata, setShouldFetchUserdata] = useState<boolean>(true);
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
    if (shouldFetchUserdata) {
      fetchData();
      setShouldFetchUserdata(false);
    }
  }, [context, setContext, token, user, navigate, shouldFetchUserdata]);

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
      setShouldFetchUserdata(true);
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
