import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../context/AppContext';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1080px;
  background-color: green;
  padding: 10px auto;
`;

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
    <StyledHeader>
      <h1>Tennis App</h1>
      {(user) && (
        <div>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <button type="button" onClick={handleLogoutButton}>Logout</button>
        </div>
      )}
    </StyledHeader>
  );
}
