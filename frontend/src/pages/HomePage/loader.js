export async function loader() {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/products`)
    .then((response) => {
      return response.json();
    })
    .then((resData) => {
      return resData.products;
    })
    .catch((err) => {
      console.log(err);
    });
}
