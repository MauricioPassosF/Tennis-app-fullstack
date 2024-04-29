import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { NewTournamentInputs } from '../../types/Tournament';
import { addTournament } from '../../services/fetchs/fetchTournament';
import { IAddTournamentForm } from '../../interfaces/HomeInterfaces';

const tournamentInitialValues: NewTournamentInputs = {
  newTournamentName: '',
  newTournamentPrize: 0,
};

export default function AddTournamentForm(props: IAddTournamentForm):JSX.Element {
  const appContext = useContext(AppContext);
  const { context: { user } } = appContext;
  const { shouldFetchProp, setAddFormActive } = props;
  const { setShouldFetchUserData } = shouldFetchProp;
  const [newTournamentInputs, setNewTournamentInputs] = useState<NewTournamentInputs>(
    tournamentInitialValues,
  );

  const handleNewTournamentInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setNewTournamentInputs({ ...newTournamentInputs, [name]: value });
  };

  const handleAddTournamentButton = async (): Promise<void> => {
    const addTournamentResponse = await addTournament(newTournamentInputs, user!.userId);
    if (addTournamentResponse) {
      setNewTournamentInputs(tournamentInitialValues);
      setAddFormActive(false);
      setShouldFetchUserData(true);
    }
  };

  const { newTournamentName, newTournamentPrize } = newTournamentInputs;
  return (
    <>
      <h1>Adicionar torneio</h1>
      <form>
        <label htmlFor="newTournamentName">
          Nome do torneio:
          <input type="text" autoComplete="name" id="newTournamentName" name="newTournamentName" value={newTournamentName} placeholder="Digite o nome" onChange={handleNewTournamentInputs} />
        </label>
        <label htmlFor="newTournamentPrize">
          Prêmio:
          <input type="number" autoComplete="additional-name" id="newTournamentPrize" name="newTournamentPrize" value={newTournamentPrize} placeholder="Digite o sobrenome" onChange={handleNewTournamentInputs} />
        </label>
      </form>
      <button type="submit" onClick={handleAddTournamentButton}>Cadastrar</button>
    </>
  );
}
