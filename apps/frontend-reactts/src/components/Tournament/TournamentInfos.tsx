import { useEffect, useState } from 'react';
import { getTournamentInfo } from '../../services/fetchs/fetchTournament';
import { TournamentInfo } from '../../types/Tournament';
import { IInfosProps } from '../../interfaces/TournamentInterfaces';

export default function TournamentInfos({ infosProps }:IInfosProps): JSX.Element {
  const { refresh, tournamentId } = infosProps;
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const tournamentData: TournamentInfo | undefined = await getTournamentInfo(tournamentId);
      if (tournamentData) {
        setTournamentInfo(tournamentData);
      }
    }
    fetchData();
  }, [refresh, tournamentId]);

  return (
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
  );
}
