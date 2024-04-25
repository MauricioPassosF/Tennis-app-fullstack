import { LoginInfo } from '../types/Login';

export default function getLoginInfo(): LoginInfo {
  const login = localStorage.getItem('login');
  const loginInfo = login ? JSON.parse(login) : { token: '' };
  return loginInfo;
}
