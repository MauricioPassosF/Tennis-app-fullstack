import { useMemo, useState } from 'react';

import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import AppContext, { ContextValueType } from './context/AppContext';
import Login from './pages/Login';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Home />} />,
      <Route path="/login" element={<Login />} />,
    ]),
  );

  const [context, setContext] = useState<ContextValueType>({
    user: null,
  });

  const contextValue = useMemo(() => ({ context, setContext }), [context, setContext]);

  return (
    <AppContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
