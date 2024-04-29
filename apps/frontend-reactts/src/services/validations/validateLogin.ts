import { LoginInputs, SignupInfo } from '../../types/Login';

const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Insira um e-mail válido');
  }
};

const validatePassword = (password: string): void => {
  if (password.length < 6) {
    throw new Error('A senha deve ter no mínimo 6 caracteres');
  }
};

const validateName = (name: string): void => {
  if (name.length < 3) {
    throw new Error('Nome deve ter no mínimo 3 caracteres');
  }
};

export const validateLogin = (loginInputs:LoginInputs): void => {
  const { email, password } = loginInputs;
  if (!email || !password) {
    throw new Error('Preencha todos os campos');
  }
  validateEmail(email);
  validatePassword(password);
};

export const validateSignUp = (signUpInputs: SignupInfo): void => {
  const {
    email, password, firstName, lastName,
  } = signUpInputs;
  if (!email || !password || !firstName || !lastName) {
    throw new Error('Preencha todos os campos');
  }
  validateEmail(email);
  validatePassword(password);
  validateName(firstName);
  validateName(lastName);
};
