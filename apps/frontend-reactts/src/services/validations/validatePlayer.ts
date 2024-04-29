import { AddPlayerInTournament } from '../../types/Player';

export default function validateNewPlayer(newPlayer: AddPlayerInTournament): void {
  if (newPlayer.TournamentId < 1 || typeof newPlayer.TournamentId !== 'number') {
    throw new Error('Torneio inválido');
  }
  if (newPlayer.playerId < 1 || typeof newPlayer.playerId !== 'number') {
    throw new Error('Jogador inválido');
  }
}
