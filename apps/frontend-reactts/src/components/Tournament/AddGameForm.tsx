import { useState } from 'react';
import Swal from 'sweetalert2';
import { AddGame } from '../../types/Game';
import addGame from '../../services/fetchs/fetchGame';
import { IAddGameForm } from '../../interfaces/TournamentInterfaces';

const initialNewGameInfo = {
  playerAScore: 0,
  playerBScore: 0,
  playerAId: 0,
  playerBId: 0,
  Status: 'Não agendado',
};

export default function AddGameForm(props: IAddGameForm): JSX.Element {
  const { formsProps, playersProps: { tournamentPlayers } } = props;
  const {
    tournamentId, refresh, finishEditTournament, editTournament,
  } = formsProps;
  const [newGameInfo, setNewGameInfo] = useState<AddGame>({
    ...initialNewGameInfo,
    TournamentId: tournamentId,
  });

  const handleNewGameInfo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setNewGameInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const { playerAId, playerBId } = newGameInfo;

  const handleAddNewGameButton = async (): Promise<void> => {
    try {
      if (playerAId === 0 || playerBId === 0) {
        throw new Error('Jogador nào selecionado');
      }
      const responseAddNewGame = await addGame(newGameInfo);
      if (responseAddNewGame) {
        setNewGameInfo({ ...initialNewGameInfo, TournamentId: tournamentId });
        finishEditTournament(refresh);
      }
    } catch (error) {
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  };

  return (
    <div>
      {editTournament === 'AddGame' && (
      <div>
        <form>
          <h3>Selecione jogador A:</h3>
          <select
            value={playerAId}
            onChange={(event) => handleNewGameInfo(event)}
            name="playerAId"
          >
            <option value={0} disabled>Selecione o jogador A</option>
            {tournamentPlayers.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {`${player.firstName} ${player.lastName}`}
              </option>
            ))}
          </select>
          <h3>Selecione jogador B:</h3>
          <select
            value={playerBId}
            onChange={(event) => handleNewGameInfo(event)}
            name="playerBId"
          >
            <option value={0} disabled>Selecione o jogador B</option>
            {tournamentPlayers.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {`${player.firstName} ${player.lastName}`}
              </option>
            ))}
          </select>
        </form>
        <button type="submit" onClick={handleAddNewGameButton}>
          Adicionar
        </button>
      </div>
      )}
    </div>
  );
}
