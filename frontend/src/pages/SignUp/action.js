import { redirect } from 'react-router-dom';
export async function action({ request }) {
  const data = await request.json();
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 422) {
        return res.json();
      } else {
        return redirect('/login');
      }
    })
    .then((resData) => {
      return resData;
    })
    .catch((err) => {
      console.log(err);
    });
}
