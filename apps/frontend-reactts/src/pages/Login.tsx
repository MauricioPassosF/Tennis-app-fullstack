import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Login/SignupForm';
import { login } from '../services/fetchs/fetchLogin';
import { LoginInputs } from '../types/Login';
import { getUserByEmail } from '../services/fetchs/fetchUser';
import AppContext from '../context/AppContext';

const LoginPage = styled.div`
  margin: 0 auto;
  background-color: green;
  padding: 20px 0px;
  border-radius: 12px;
`;

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const { setContext, context } = useContext(AppContext);
  const [signupActive, setSignupActive] = useState<boolean>(false);

  const handleGetUser = useCallback(async (token: string, email: string): Promise<void> => {
    const getUserResponse = await getUserByEmail(token, email);
    if (getUserResponse && getUserResponse.email === email) {
      setContext({ ...context, user: getUserResponse, token });
      navigate('/');
    }
  }, [setContext, context, navigate]);

  const handleLogin = async (loginInputs: LoginInputs): Promise <void> => {
    const { email } = loginInputs;
    const token = await login(loginInputs);
    if (token) {
      localStorage.setItem('login', JSON.stringify({ token, email }));
      handleGetUser(token, loginInputs.email);
    }
  };

  const handleSignup = { handleLogin, setSignupActive };

  return (
    <LoginPage>
      {!signupActive
        ? (
          <div>
            <LoginForm handleLogin={handleLogin} handleGetUser={handleGetUser} />
            <button type="button" onClick={() => setSignupActive(true)}>Não tenho cadastro</button>
          </div>
        )
        : (<SignupForm handleSignup={handleSignup} />)}
    </LoginPage>
  );
}
