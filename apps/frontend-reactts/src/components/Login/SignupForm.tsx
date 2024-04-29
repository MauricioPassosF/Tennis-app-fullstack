import { useState } from 'react';
import Swal from 'sweetalert2';
import { signup } from '../../services/fetchs/fetchLogin';
import { SignupInfo, SignupInputs } from '../../types/Login';
import { ISignupFormProps } from '../../interfaces/LoginInterfaces';
import { validateSignUp } from '../../services/validations/validateLogin';

export default function SignupForm({ handleSignup }: ISignupFormProps): JSX.Element {
  const [signupInputs, setSignupInputs] = useState<SignupInputs>({
    newFirstName: '',
    newLastName: '',
    newEmail: '',
    newPassword: '',
  });
  const { handleLogin, setSignupActive } = handleSignup;

  const handleSignupButton = async (): Promise <void> => {
    const signUpInfo: SignupInfo = {
      firstName: signupInputs.newFirstName,
      lastName: signupInputs.newLastName,
      email: signupInputs.newEmail,
      password: signupInputs.newPassword,
    };
    try {
      validateSignUp(signUpInfo);
      const signupResponse: boolean = await signup(signUpInfo);
      if (signupResponse) {
        handleLogin({ email: signupInputs.newEmail, password: signupInputs.newPassword });
        setSignupActive(false);
      }
    } catch (error) {
      Swal.fire({ title: 'Erro', text: `${error}` });
    }
  };

  const handleSignupInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSignupInputs({ ...signupInputs, [name]: value });
  };

  const {
    newFirstName, newLastName, newEmail, newPassword,
  } = signupInputs;
  return (

    <div>
      <form>
        <label htmlFor="newFirstName">
          Nome:
          <input type="text" autoComplete="given-name" id="newFirstName" name="newFirstName" value={newFirstName} placeholder="Digite o nome" onChange={handleSignupInputs} />
        </label>
        <label htmlFor="newLastName">
          Sobrenome:
          <input type="text" autoComplete="family-name" id="newLastName" name="newLastName" value={newLastName} placeholder="Digite o sobrenome" onChange={handleSignupInputs} />
        </label>
        <label htmlFor="newEmail">
          Email:
          <input type="text" autoComplete="email" id="newEmail" name="newEmail" value={newEmail} placeholder="Digite o e-mail" onChange={handleSignupInputs} />
        </label>
        <label htmlFor="newPassword">
          Password:
          <input type="password" autoComplete="current-password" id="newPassword" name="newPassword" value={newPassword} placeholder="Digite a senha" onChange={handleSignupInputs} />
        </label>
      </form>
      <button type="submit" onClick={handleSignupButton}>Cadastrar</button>
    </div>
  );
}
