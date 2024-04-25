import Swal from 'sweetalert2';
import { AddGame } from '../../types/Game';

export default async function addGame(newGameInfo: AddGame): Promise<boolean | undefined> {
  try {
    const response = await fetch('http://localhost:8080/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGameInfo),
    });
    return response.ok;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: 'Falha na requisição' });
    return undefined;
  }
}
