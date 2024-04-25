import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';
import { User } from '../types/User';

type LoginInputs = {
  email: string;
  password: string;
};

type SignupInputs = {
  newFirstName: string;
  newLastName: string;
  newEmail: string;
  newPassword: string;
};

type LoginInfo = {
  email: string;
  token: string
};

const getLoginInfo = (): LoginInfo => {
  const login = localStorage.getItem('login');
  const loginInfo = login ? JSON.parse(login) : { token: '' };
  console.log(loginInfo);
  return loginInfo;
};

function Login(): JSX.Element {
  const { setContext, context } = useContext(AppContext);

  const [loginInputs, setLoginInputs] = useState<LoginInputs>({
    email: '',
    password: '',
  });

  const [signupInputs, setSignupInputs] = useState<SignupInputs>({
    newFirstName: '',
    newLastName: '',
    newEmail: '',
    newPassword: '',
  });

  const navigate = useNavigate();

  // adicionar rota de usuario por email antes
  const getUserByEmail = useCallback(async (token: string, email: string): Promise<void> => {
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
        setContext({ ...context, user: data, token });
        navigate('/');
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  }, [context, navigate, setContext]);

  useEffect(() => {
    console.log('teste');
    const loginInfo = getLoginInfo();
    const { token, email } = loginInfo;
    if (typeof token === 'string' && token !== '') {
      console.log('teste2');
      getUserByEmail(token, email);
    }
  }, [getUserByEmail]);

  const login = async (userAcessInfo: LoginInputs): Promise <void > => {
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
        localStorage.setItem('login', JSON.stringify({ token, email: userAcessInfo.email }));
        getUserByEmail(token, userAcessInfo.email);
      }
    } catch (error) {
      console.log('login Error');
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  };

  const signup = async (): Promise <void > => {
    try {
      const response = await fetch('http://localhost:8080/login/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: signupInputs.newFirstName,
          lastName: signupInputs.newLastName,
          email: signupInputs.newEmail,
          password: signupInputs.newPassword,
        }),
      });
      console.log('signupPos fecth');
      if (response.ok) {
        console.log('signupPos fecth ok');
        login({ email: signupInputs.newEmail, password: signupInputs.newPassword });
      } else {
        console.log('signupPos fecth not ok');
        throw new Error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.log('signupPos fecth error');
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  };

  const handleLoginInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  const handleSignupInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSignupInputs({ ...signupInputs, [name]: value });
  };

  const { email, password } = loginInputs;
  const {
    newFirstName, newLastName, newEmail, newPassword,
  } = signupInputs;
  return (

    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">
          Email:
          <input type="text" autoComplete="email" id="email" name="email" value={email} placeholder="Digite o e-mail" onChange={handleLoginInputs} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" autoComplete="current-password" id="password" name="password" value={password} placeholder="Digite a senha" onChange={handleLoginInputs} />
        </label>
      </form>
      <button type="submit" onClick={() => login(loginInputs)}>Login</button>
      <h1>Novo cadastro</h1>
      <form>
        <label htmlFor="newFirstName">
          Nome:
          <input type="text" autoComplete="given-name" id="newFirstName" name="newFirstName" value={newFirstName} placeholder="Digite o nome" onChange={handleSignupInputs} />
        </label>
        <label htmlFor="newLastName">
          Sobrenome:
          <input type="text" autoComplete="family-name" id="newLastName" name="newLastName" value={newLastName} placeholder="Digite o sobrenome" onChange={handleSignupInputs} />
        </label>
        <label htmlFor="newEmail">
          Email:
          <input type="text" autoComplete="email" id="newEmail" name="newEmail" value={newEmail} placeholder="Digite o e-mail" onChange={handleSignupInputs} />
        </label>
        <label htmlFor="newPassword">
          Password:
          <input type="password" autoComplete="current-password" id="newPassword" name="newPassword" value={newPassword} placeholder="Digite a senha" onChange={handleSignupInputs} />
        </label>
      </form>
      <button type="submit" onClick={signup}>Cadastrar</button>
    </div>
  );
}

export default Login;
