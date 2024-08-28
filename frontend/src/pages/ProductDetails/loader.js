export async function loader({ params }) {
  const productId = params.productID;
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`)
    .then((response) => {
      return response.json();
    })
    .then((resData) => {
      return resData.product;
    })
    .catch((err) => {
      console.log(err);
    });
}
