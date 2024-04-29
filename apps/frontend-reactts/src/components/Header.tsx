import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Header(): JSX.Element {
  const { context, setContext } = useContext(AppContext);
  const { user } = context;
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    localStorage.removeItem('login');
    setContext({ user: null, token: undefined });
    navigate('/login');
  };

  return (
    <header>
      <h1>Header</h1>
      {user && <h2>{`${user.firstName} ${user.lastName}`}</h2>}
      <button type="button" onClick={handleLogoutButton}>Logout</button>
    </header>
  );
}
