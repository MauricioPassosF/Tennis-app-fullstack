import { useContext, useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import { PlayerInfo } from '../types/Player';
import getLoginInfo from '../services/localStorage';
import HomePlayer from '../components/Home/HomePlayer';
import PlayerTournaments from '../components/Home/PlayerTournaments';
import AdminTournaments from '../components/Home/AdminTournaments';

export default function Home(): JSX.Element {
  const appContext = useContext(AppContext);
  const { context, setContext } = appContext;
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | undefined>();
  const [shouldFetchUserData, setShouldFetchUserData] = useState<boolean>(true);
  const { user, token } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { setContext({ ...context, token: getLoginInfo().token }); }
    if (!user) {
      navigate('/login');
    }
  }, [user, token, context, navigate, setContext]);

  const playerInfoState = { playerInfo, setPlayerInfo };
  const shouldFetchProp = { shouldFetchUserData, setShouldFetchUserData };
  return (
    <>
      <Header />
      <HomePlayer playerInfoState={playerInfoState} />
      <AdminTournaments shouldFetchProp={shouldFetchProp} />
      <PlayerTournaments playerInfoState={playerInfoState} />
    </>
  );
}
