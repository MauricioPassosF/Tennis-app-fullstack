import { useContext } from 'react';
import AppContext from '../context/AppContext';

function Header(): JSX.Element {
  const { context: { user } } = useContext(AppContext);

  return (
    <header>
      <h1>Header</h1>
      {user && <h2>{`${user.firstName} ${user.lastName}`}</h2>}
    </header>
  );
}

export default Header;
