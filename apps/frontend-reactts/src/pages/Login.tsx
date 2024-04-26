import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Login/SignupForm';
import { login } from '../services/fetchs/fetchLogin';
import { LoginInputs } from '../types/Login';
import { getUserByEmail } from '../services/fetchs/fetchUser';
import AppContext from '../context/AppContext';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { setContext, context } = useContext(AppContext);

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

  return (
    <div>
      <LoginForm handleLogin={handleLogin} handleGetUser={handleGetUser} />
      <SignupForm handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
