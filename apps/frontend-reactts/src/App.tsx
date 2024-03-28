import { useMemo } from 'react';

import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import AppContext, { AppContextType } from './context/AppContext';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />} />,
    ),
  );

  const value: AppContextType = useMemo(() => ({ user: 'guest' }), []);

  return (
    <AppContext.Provider value={value}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
