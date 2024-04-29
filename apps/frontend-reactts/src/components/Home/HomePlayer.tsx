import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { addAsPlayer, getUserPlayerInfo } from '../../services/fetchs/fetchPlayer';
import { PlayerInfo } from '../../types/Player';
import { IPlayerInfoState } from '../../interfaces/HomeInterfaces';

export default function HomePlayer({ playerInfoState }: IPlayerInfoState): JSX.Element {
  const [addAsPlayerInput, setAddAsPlayerInput] = useState<string>('');
  const { playerInfo, setPlayerInfo } = playerInfoState;
  const [registerFormActive, setRegisterFormActive] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  const { context } = appContext;
  const { user, token } = context;

  useEffect(() => {
    async function fetchData() {
      if (user && token) {
        const { userId } = user;
        const userPlayerInfo: PlayerInfo | undefined = await getUserPlayerInfo(userId, token);
        if (userPlayerInfo) { setPlayerInfo(userPlayerInfo); }
      }
    }
    fetchData();
  }, [user, token, setPlayerInfo]);

  const handleAddAsPlayerButton = async (): Promise<void> => {
    if (user && (addAsPlayerInput === 'Apto' || addAsPlayerInput === 'Ausente' || addAsPlayerInput === 'Lesionado')) {
      const addAsPlayerResponse = await addAsPlayer(
        { status: addAsPlayerInput, userId: user!.userId },
      );
      if (addAsPlayerResponse) {
        setPlayerInfo(addAsPlayerResponse);
        setAddAsPlayerInput('');
        setRegisterFormActive(false);
      }
    }
  };

  return (
    <div>
      <h1>Jogador</h1>
      {!playerInfo ? (
        <div>
          {!registerFormActive ? (
            <div>
              <h2>Usuário não está cadastrado como jogador</h2>
              <button type="button" onClick={() => setRegisterFormActive(true)}>Cadastrar</button>
            </div>
          ) : (
            <div>
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
          )}
        </div>
      ) : (
        <div>
          <h2>{playerInfo.playerId}</h2>
          <p>{playerInfo.status}</p>
        </div>
      ) }
    </div>

  );
}
