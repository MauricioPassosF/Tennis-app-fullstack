export type LoginInputs = {
  email: string;
  password: string;
};

export type SignupInputs = {
  newFirstName: string;
  newLastName: string;
  newEmail: string;
  newPassword: string;
};

export type SignupInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginInfo = {
  email: string;
  token: string
};
