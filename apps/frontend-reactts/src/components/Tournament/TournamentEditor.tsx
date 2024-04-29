import { useState } from 'react';
import AddGameForm from './AddGameForm';
import { EditTournament } from '../../types/Tournament';
import AddPlayerForm from './AddPlayerForm';
import { IInfosPlayers } from '../../interfaces/TournamentInterfaces';

export default function TournamentEditor(props:IInfosPlayers): JSX.Element {
  const [editTournament, setEditTournament] = useState<EditTournament>('');
  const { playersProps, infosProps } = props;
  const { setRefresh } = infosProps;

  const finishEditTournament = (refreshState: boolean): void => {
    setEditTournament('');
    setRefresh(!refreshState);
  };

  const formsProps = { ...infosProps, editTournament, finishEditTournament };

  return (
    <div>
      <button type="button" onClick={() => setEditTournament('AddGame')}>Adicionar Jogo</button>
      <button type="button" onClick={() => setEditTournament('AddPlayer')}>Adicionar Jogador</button>
      <button type="button" onClick={() => setEditTournament('Edit')}>Editar</button>
      <button type="button" onClick={() => setEditTournament('Delete')}>Excluir</button>
      <AddGameForm formsProps={formsProps} playersProps={playersProps} />
      <AddPlayerForm formsProps={formsProps} />
    </div>
  );
}
