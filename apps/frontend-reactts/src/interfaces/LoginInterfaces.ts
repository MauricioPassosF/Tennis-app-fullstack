import { LoginInputs } from '../types/Login';

export interface ISignupFormProps {
  handleSignup:{
    handleLogin: (inputs: LoginInputs) => void;
    setSignupActive: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

export interface ILoginFormProps {
  handleLogin: (inputs: LoginInputs) => void;
  handleGetUser: (token: string, email: string) => void;
}
