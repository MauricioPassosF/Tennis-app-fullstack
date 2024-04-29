import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { LoginInputs } from '../../types/Login';
import getLoginInfo from '../../services/localStorage';
import { ILoginFormProps } from '../../interfaces/LoginInterfaces';
import { validateLogin } from '../../services/validations/validateLogin';

export default function LoginForm({ handleLogin, handleGetUser }: ILoginFormProps): JSX.Element {
  const [loginInputs, setLoginInputs] = useState<LoginInputs>({
    email: '',
    password: '',
  });
  const firstUpdate = useRef(true);

  useEffect(() => {
    async function fetchData() {
      const loginInfo = getLoginInfo();
      const { token, email } = loginInfo;
      if (typeof token === 'string' && token !== '') {
        handleGetUser(token, email);
      }
    }
    if (firstUpdate.current) {
      firstUpdate.current = false;
      fetchData();
    }
  }, [handleGetUser]);

  const handleLoginButton = async (): Promise <void> => {
    try {
      validateLogin(loginInputs);
      handleLogin(loginInputs);
    } catch (error) {
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  };

  const handleLoginInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  const { email, password } = loginInputs;
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
    </div>
  );
}
