import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TournamentPlayers from '../components/Tournament/TournamentPlayers';
import TournamentGames from '../components/Tournament/TournamentGames';
import TournamentInfos from '../components/Tournament/TournamentInfos';
import TournamentEditor from '../components/Tournament/TournamentEditor';
import { TournamentPlayer } from '../types/Tournament';

export default function Tournament(): JSX.Element {
  const location = useLocation();
  const tournamentId = useMemo(() => Number(location.pathname.split('/')[2]), [location]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [tournamentPlayers, setTournamentPlayers] = useState<TournamentPlayer[]>([]);

  const infosProps = { tournamentId, refresh, setRefresh };
  const playersProps = { tournamentPlayers, setTournamentPlayers };
  return (
    <div>
      <TournamentInfos infosProps={infosProps} />
      <TournamentEditor infosProps={infosProps} playersProps={playersProps} />
      <TournamentGames infosProps={infosProps} />
      <TournamentPlayers infosProps={infosProps} playersProps={playersProps} />
    </div>
  );
}
