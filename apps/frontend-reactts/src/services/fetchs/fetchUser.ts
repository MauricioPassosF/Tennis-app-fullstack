import Swal from 'sweetalert2';
import { User } from '../../types/User';
import { AdminTournament } from '../../types/Tournament';

export const getUserByEmail = async (token: string, email: string): Promise<User | undefined> => {
  try {
    const response = await fetch(`http://localhost:8080/user/email/${email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: User = await response.json();
    console.log(data);
    if (data.email === email) {
      return data;
    }
    throw new Error('User not found');
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};

export const getUserTournaments = async (userId: number, token: string):
Promise<AdminTournament[] | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/${userId}/tournaments`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: AdminTournament[] = await response.json();
    return data;
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};
