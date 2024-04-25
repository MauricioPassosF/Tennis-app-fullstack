import Swal from 'sweetalert2';
import {
  NewTournamentInputs,
  TournamentError, TournamentGame, TournamentInfo, TournamentPlayer,
} from '../../types/Tournament';
import { AddPlayerInTournament } from '../../types/Player';

export const getTournamentInfo = async (tournamentId: number):
Promise<TournamentInfo | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/tournament/${tournamentId}`,
      { method: 'GET' },
    );
    const data: TournamentInfo | TournamentError = await response.json();
    const { message } = data as TournamentError;
    if (message) {
      throw new Error(message);
    }
    return data as TournamentInfo;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
};

export const getTournamentGames = async (tournamentId: number):
Promise<TournamentGame[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/tournament/${tournamentId}/games`,
      { method: 'GET' },
    );
    const data: TournamentGame[] | TournamentError = await response.json();
    const { message } = data as TournamentError;
    if (message) {
      throw new Error(message);
    }
    return data as TournamentGame[];
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
};

export const getTournamentPlayers = async (tournamentId: number):
Promise<TournamentPlayer[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/tournament/${tournamentId}/players`,
      { method: 'GET' },
    );
    const data: TournamentPlayer[] | TournamentError = await response.json();
    const { message } = data as TournamentError;
    if (message) {
      throw new Error(message);
    }
    return data as TournamentPlayer[];
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
};

export const addPlayer = async (
  newPlayer: AddPlayerInTournament,
): Promise <boolean | undefined> => {
  try {
    const response = await fetch('http://localhost:8080/tournament/addPlayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });
    return response.ok;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
};

// adicionar autorizacao
export const addTournament = async (newTournament: NewTournamentInputs, userId: number):
Promise <boolean > => {
  try {
    const response = await fetch('http://localhost:8080/tournament', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newTournament.newTournamentName,
        status: 'Não iniciado',
        prizeMoney: newTournament.newTournamentPrize,
        userId,
      }),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar torneio');
    }
    return response.ok;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return false;
  }
};
