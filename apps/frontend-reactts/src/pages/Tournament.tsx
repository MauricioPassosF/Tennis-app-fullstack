import { useLocation } from 'react-router-dom';

function Tournament(): JSX.Element {
  const tournamentId = Number(useLocation().pathname.split('/')[2]);
  console.log(typeof (tournamentId));
  return (
    <div>
      <h1>Tournament</h1>
    </div>
  );
}

export default Tournament;
