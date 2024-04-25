import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { login, signup } from '../services/fetchs/fetchLogin';
import {
  LoginInfo, LoginInputs, SignupInfo, SignupInputs,
} from '../types/Login';
import { getUserByEmail } from '../services/fetchs/fetchUser';

const getLoginInfo = (): LoginInfo => {
  const loginFromLS = localStorage.getItem('login');
  const loginInfo = loginFromLS ? JSON.parse(loginFromLS) : { token: '' };
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

  useEffect(() => {
    async function fetchData() {
      console.log('teste');
      const loginInfo = getLoginInfo();
      const { token, email } = loginInfo;
      if (typeof token === 'string' && token !== '') {
        console.log('teste2');
        const getUserResponse = await getUserByEmail(token, email);
        if (getUserResponse && getUserResponse.email === email) {
          setContext({ ...context, user: getUserResponse, token });
          navigate('/');
        }
      }
    }
    fetchData();
  }, [context, navigate, setContext]);

  const handleLoginButton = async (): Promise <void> => {
    const token = await login(loginInputs);
    if (token) {
      localStorage.setItem('login', JSON.stringify({ token, email: loginInputs.email }));
      getUserByEmail(token, loginInputs.email);
    }
  };

  const handleSignupButton = async (): Promise <void> => {
    const signUpInfo: SignupInfo = {
      firstName: signupInputs.newFirstName,
      lastName: signupInputs.newLastName,
      email: signupInputs.newEmail,
      password: signupInputs.newPassword,
    };
    const signupResponse: boolean = await signup(signUpInfo);
    if (signupResponse) {
      login({ email: signupInputs.newEmail, password: signupInputs.newPassword });
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
      <button type="submit" onClick={handleLoginButton}>Login</button>
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
      <button type="submit" onClick={handleSignupButton}>Cadastrar</button>
    </div>
  );
}

export default Login;
