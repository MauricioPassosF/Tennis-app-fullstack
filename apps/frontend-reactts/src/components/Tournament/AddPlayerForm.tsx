import { useState } from 'react';
import Swal from 'sweetalert2';
import { addPlayer } from '../../services/fetchs/fetchTournament';
import { AddPlayerInTournament } from '../../types/Player';
import { IFormsProps } from '../../interfaces/TournamentInterfaces';
import validateNewPlayer from '../../services/validations/validatePlayer';

export default function AddPlayerForm({ formsProps }: IFormsProps): JSX.Element {
  const {
    tournamentId, refresh, finishEditTournament, editTournament,
  } = formsProps;
  const [newPlayer, setNewPlayer] = useState<AddPlayerInTournament>({
    playerId: 0, TournamentId: tournamentId,
  });

  const handleAddNewPlayerButton = async (): Promise<void> => {
    try {
      validateNewPlayer(newPlayer);
      const responseAddNewPlayer = await addPlayer(newPlayer);
      if (responseAddNewPlayer) {
        setNewPlayer({ ...newPlayer, playerId: 0 });
        finishEditTournament(refresh);
      }
    } catch (error) {
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  };

  return (
    <div>
      {editTournament === 'AddPlayer' && (
      <div>
        <form>
          <label htmlFor="playerId">
            Digite Id do jogador:
            <input type="number" name="playerId" onChange={(event) => setNewPlayer({ ...newPlayer, playerId: Number(event.target.value) })} value={newPlayer.playerId} />
          </label>
        </form>
        <button type="submit" onClick={handleAddNewPlayerButton}>
          Adicionar
        </button>
      </div>
      )}
    </div>
  );
}