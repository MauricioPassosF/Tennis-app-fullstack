import Swal from 'sweetalert2';
import { LoginInputs, SignupInfo } from '../../types/Login';

export const login = async (userAcessInfo: LoginInputs): Promise <string | undefined > => {
  console.log('login Pre fecth');
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAcessInfo),
    });
    const token = await response.text();
    console.log('login Pos fecth');
    console.log(token);
    if (typeof token === 'string') {
      return token;
    }
    throw new Error('Erro ao logar');
  } catch (error) {
    console.log('login Error');
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
    console.log('signupPos fecth');
    if (response.ok) {
      console.log('signupPos fecth ok');
      return true;
    }
    throw new Error('Erro ao cadastrar usuário');
  } catch (error) {
    console.log('signupPos fecth error');
    Swal.fire({ title: 'Erro', text: `${error}` });
    return false;
  }
};
