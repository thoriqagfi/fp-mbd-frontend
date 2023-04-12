import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = () => {
  return cookies.get('token');
}

export const setToken = (token: string) => {
  return cookies.set('token', token, { 
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: true,
  });
}

export const removeToken = () => {
  return cookies.remove('token', {
    path: '/',
  });
}