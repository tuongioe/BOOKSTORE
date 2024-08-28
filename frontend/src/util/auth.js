import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
}

export function loader() {
  const token = getAuthToken();
  if (token) {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch user.');
        }
        return res.json();
      })
      .then((resData) => {
        return resData.user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return null;
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/login');
  }
  return null;
}
