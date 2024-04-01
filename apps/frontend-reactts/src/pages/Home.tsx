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
  const { context: { user } } = appContext;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const userAdminTournaments:
        AdminTournament[] | undefined = await getUserTournaments(user.userId);
        if (userAdminTournaments) {
          setAdminTournaments(userAdminTournaments);
        }
      }
    }
    fetchData();
  }, [user]);

  return (
    <>
      <Header />
      <h1>Vite + React</h1>
      <h1>Torneios administrados</h1>
      {adminTournaments.length === 0 ? (<h2>Nenhum torneio disponivel</h2>) : (
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
      {/* {tournaments.length === 0 ? (<h2>Nenhum torneio disponivel</h2>) : (
        <div>
          {tournaments.map((tournament) => (
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
        </div> */}
      {/* )} */}
    </>
  );
}

export default Home;
