export type AddPlayerInTournament = {
  playerId: number;
  TournamentId: number;
};

export type PlayerInfo = {
  playerId: number;
  status: 'Apto' | 'Ausente' | 'Lesionado'
};

export type AddPlayerInfo = {
  userId: number;
  status: 'Apto' | 'Ausente' | 'Lesionado'
};
