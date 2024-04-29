import { NewTournamentInputs } from '../../types/Tournament';

export default function validateTournament(newTournamentInputs: NewTournamentInputs): void {
  const { newTournamentName, newTournamentPrize } = newTournamentInputs;
  if (!newTournamentName || !newTournamentPrize) {
    throw new Error('Preencha todos os campos');
  }
  if (newTournamentPrize < 1 || typeof newTournamentPrize !== 'number') {
    throw new Error('Prêmio inválido');
  }
  if (newTournamentName.length < 5 || typeof newTournamentPrize !== 'string') {
    throw new Error('Nome do torneio deve ter mais de 5 caracteres');
  }
}
