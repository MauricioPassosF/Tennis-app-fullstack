import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getUserTournaments } from '../../services/fetchs/fetchUser';
import { AdminTournament } from '../../types/Tournament';
import { IShouldFetchProp } from '../../interfaces/HomeInterfaces';

export default function AdminTournaments({ shouldFetchProp }: IShouldFetchProp): JSX.Element {
  const appContext = useContext(AppContext);
  const { context } = appContext;
  const [adminTournaments, setAdminTournaments] = useState<AdminTournament[]>([]);
  const { shouldFetchUserData, setShouldFetchUserData } = shouldFetchProp;
  const { user, token } = context;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (user && token) {
        const { userId } = user;
        const userAdminTournaments:
        AdminTournament[] | undefined = await getUserTournaments(userId, token);
        if (userAdminTournaments) {
          setAdminTournaments(userAdminTournaments);
        }
      }
    }
    if (shouldFetchUserData) {
      fetchData();
      setShouldFetchUserData(false);
    }
  }, [token, user, shouldFetchUserData, setShouldFetchUserData]);

  return (
    <>
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
    </>
  );
}
