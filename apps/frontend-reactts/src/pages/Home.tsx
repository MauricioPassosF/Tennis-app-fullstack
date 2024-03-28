import { useContext, useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import './App.css';
import AppContext from '../context/AppContext';

function Home(): JSX.Element {
  const [count, setCount] = useState(0);
  const appContext = useContext(AppContext);

  const { context: { user } } = appContext;

  return (
    <>
      <div>
        <h1>{user ? `${user.firstName} ${user.lastName}` : ''}</h1>
        <h2>Test</h2>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((tcount) => tcount + 1)}>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
