import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { User } from '../types/User';

type LoginInputs = {
  email: string;
  password: string;
};

function Login(): JSX.Element {
  const { setContext, context } = useContext(AppContext);

  const [loginInputs, setLoginInputs] = useState<LoginInputs>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const login = async (): Promise<void> => {
    const { email } = loginInputs;
    try {
      const response = await fetch('http://localhost:8080/user', { method: 'GET' });
      const data: User[] = await response.json();
      const user: User | undefined = data.find((userData) => userData.email === email);
      if (user) {
        setContext({ ...context, user });
        navigate('/');
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log(error);
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
          <input type="text" id="email" name="email" value={email} placeholder="Digite o e-mail" onChange={handleLoginInputs} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" id="password" name="password" value={password} placeholder="Digite a senha" onChange={handleLoginInputs} />
        </label>
      </form>
      <button type="submit" onClick={login}>Login</button>
    </div>
  );
}

export default Login;
