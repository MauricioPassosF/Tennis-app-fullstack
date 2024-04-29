import { EditTournament, TournamentPlayer } from '../types/Tournament';

export interface IInfosProps {
  infosProps:{
    refresh: boolean;
    tournamentId: number;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

export interface IFormsProps {
  formsProps:{
    refresh: boolean;
    tournamentId: number;
    editTournament: EditTournament;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    finishEditTournament: (refreshState: boolean) => void;
  }
}

export interface IInfosPlayers extends IInfosProps {
  playersProps:{
    tournamentPlayers: TournamentPlayer[];
    setTournamentPlayers: React.Dispatch<React.SetStateAction<TournamentPlayer[]>>;
  }
}

export interface IAddGameForm extends IFormsProps {
  playersProps:{
    tournamentPlayers: TournamentPlayer[];
    setTournamentPlayers: React.Dispatch<React.SetStateAction<TournamentPlayer[]>>;
  }
}
