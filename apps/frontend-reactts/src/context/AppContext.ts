import { createContext } from 'react';

export type AppContextType = {
  user : 'admin' | 'user' | 'guest';
};
const AppContext = createContext({} as AppContextType);

export default AppContext;
