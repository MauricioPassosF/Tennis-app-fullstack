import { createContext } from 'react';
import { User } from '../types/User';

export type ContextValueType = {
  user : User | null;
};

export type AppContextType = {
  context: ContextValueType;
  setContext: (context: ContextValueType) => void;
};

const AppContext = createContext({} as AppContextType);

export default AppContext;
