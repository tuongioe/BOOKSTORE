import { redirect } from 'react-router-dom';

export async function action({ request }) {
  let response;
  const data = await request.json();
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      response = res;
      return res.json();
    })
    .then((resData) => {
      console.log(response);
      if (response.status === 401) {
        console.log(resData);
        return resData;
      } else {
        localStorage.setItem('token', resData.token);
        return redirect('/');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
