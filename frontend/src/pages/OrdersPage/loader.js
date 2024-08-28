import { getAuthToken } from '../../util/auth';
import { redirect } from 'react-router-dom';
export async function loader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/login');
  }
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/shop/order`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((resData) => {
      console.log(resData.orders);
      return resData.orders;
    })
    .catch((err) => {
      console.log(err);
    });
}
