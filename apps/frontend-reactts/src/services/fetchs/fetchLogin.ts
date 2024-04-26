import Swal from 'sweetalert2';
import { LoginInputs, SignupInfo } from '../../types/Login';

export const login = async (userAcessInfo: LoginInputs): Promise <string | undefined > => {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAcessInfo),
    });
    const token = await response.text();
    if (typeof token === 'string') {
      return token;
    }
    throw new Error('Erro ao logar');
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return undefined;
  }
};

export const signup = async (signupInfo: SignupInfo): Promise <boolean > => {
  try {
    const response = await fetch('http://localhost:8080/login/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupInfo),
    });
    if (response.ok) {
      return true;
    }
    throw new Error('Erro ao cadastrar usuário');
  } catch (error) {
    Swal.fire({ title: 'Erro', text: `${error}` });
    return false;
  }
};
