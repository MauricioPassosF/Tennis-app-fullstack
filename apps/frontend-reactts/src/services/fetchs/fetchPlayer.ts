import Swal from 'sweetalert2';
import { AdminTournament } from '../../types/Tournament';
import { AddPlayerInfo, PlayerInfo } from '../../types/Player';

export const getPlayerTournaments = async (playerId: number):
Promise<AdminTournament[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/player/${playerId}/tournaments`,
      { method: 'GET' },
    );
    const data: AdminTournament[] = await response.json();
    return data;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};

export const getUserPlayerInfo = async (userId: number, token: string):
Promise<PlayerInfo | undefined> => {
  try {
    const response = await fetch(`http://localhost:8080/player/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return undefined;
    }
    const data: PlayerInfo = await response.json();
    return data;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
};

// adicionar autorizacao
export const addAsPlayer = async (addPlayerInfo: AddPlayerInfo):
Promise <PlayerInfo | undefined > => {
  try {
    const response = await fetch('http://localhost:8080/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addPlayerInfo),
    });
    if (response.ok) {
      const data = await response.json();
      const { playerId, status } = data;
      return { playerId, status };
    }
    return undefined;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};
