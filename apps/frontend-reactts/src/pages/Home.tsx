import { useContext, useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';

type AdminTournament = {
  tournamentId: number;
  tournamentName: string;
  tournamentStatus: string;
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
    console.log(error);
    return undefined;
  }
};

const getUserTournaments = async (userId: number): Promise<AdminTournament[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/${userId}/tournaments`,
      { method: 'GET' },
    );
    const data: AdminTournament[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

function Home(): JSX.Element {
  const appContext = useContext(AppContext);
  const [adminTournaments, setAdminTournaments] = useState<AdminTournament[]>([]);
  const [playerId] = useState<number | undefined >(undefined);
  const [playerTournaments, setPlayerTournaments] = useState<AdminTournament[]>([]);
  const { context: { user } } = appContext;
  const navigate = useNavigate();

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    async function fetchData() {
      if (user) {
        const userAdminTournaments:
        AdminTournament[] | undefined = await getUserTournaments(user.userId);
        if (userAdminTournaments) {
          setAdminTournaments(userAdminTournaments);
        }
        // falta rota de pegar player por userId
        // const userPlayerId: number = await
      }
    }
    fetchData();
  }, [user, navigate]);

  useEffect(() => {
    async function fetchData() {
      if (playerId) {
        const userPlayerTournaments:
        AdminTournament[] | undefined = await getPlayerTournaments(playerId);
        if (userPlayerTournaments) {
          setPlayerTournaments(userPlayerTournaments);
        }
      }
    }
    fetchData();
  }, [playerId]);

  return (
    <>
      <Header />
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
