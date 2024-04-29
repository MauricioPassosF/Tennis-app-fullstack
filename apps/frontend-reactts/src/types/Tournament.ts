export type TournamentPlayer = {
  playerId: number;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
};

export type TournamentError = {
  message: string;
};

export type TournamentInfo = {
  tournamentId: number;
  tournamentName: string;
  tournamentStatus: string;
  prizeMoney: number;
  admFirstName: string;
  admLastName: string;
};

export type TournamentGame = {
  gameDataTime: string
  gameId: number;
  gameStatus: string;
  playerAScore: number;
  playerBScore: number;
  playerAFirstName: string;
  playerALastName: string;
  playerBFirstName: string;
  playerBLastName: string;
};

export type AdminTournament = {
  tournamentId: number;
  tournamentName: string;
  tournamentStatus: string;
};

export type NewTournamentInputs = {
  newTournamentName: string;
  newTournamentPrize: number;
};

export type EditTournament = 'AddGame' | 'AddPlayer' | 'Edit' | 'Delete' | '';
