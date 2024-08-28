import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp';
import { action as SignUpAction } from './pages/SignUp/action';
import HomePage from './pages/HomePage';
import { loader as HomePageLoader } from './pages/HomePage/loader';
import ProductDetails from './pages/ProductDetails';
import { loader as ProductDetailsLoader } from './pages/ProductDetails/loader';
import CheckOutPage from './pages/CheckOutPage';
import LastStepCheckOutPage from './pages/LastStepCheckOutPage';
import { loader as TokenLoader } from './util/auth';
import { checkAuthLoader, getAuthToken } from './util/auth';
import OrdersPage from './pages/OrdersPage';
import { loader as OrderLoader } from './pages/OrdersPage/loader';
import AdminLayout, { loader as AdminLoader } from './pages/Admin/AdminLayout';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import { loader as AdminOrdersLoader } from './pages/Admin/AdminOrders/loader';
import { loader as AdminProductsLoader } from './pages/Admin/AdminProducts/loader';

const router = createBrowserRouter([
  {
    path: `${ROUTES.HOME}`,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: TokenLoader,
    id: 'root',
    children: [
      { index: true, element: <HomePage />, loader: HomePageLoader },
      {
        path: `${ROUTES.LOGIN}`,
        element: <LoginPage />,
        loader: () => {
          const token = getAuthToken();
          if (token) {
            return redirect('/');
          } else return null;
        },
      },
      {
        path: `${ROUTES.SIGNUP}`,
        element: <SignUpPage />,
        action: SignUpAction,
        loader: () => {
          const token = getAuthToken();
          if (token) {
            return redirect('/');
          } else return null;
        },
      },
      {
        path: 'product/:productID',
        element: <ProductDetails />,
        loader: ProductDetailsLoader,
      },
      { path: `${ROUTES.CHECKOUT}`, element: <CheckOutPage /> },
      {
        path: `${ROUTES.LASTSTEPCHECKOUT}`,
        element: <LastStepCheckOutPage />,
        loader: checkAuthLoader,
      },
      {
        path: `${ROUTES.ORDERS}`,
        element: <OrdersPage />,
        loader: OrderLoader,
      },
    ],
  },
  {
    path: `${ROUTES.ADMIN}`,
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    loader: AdminLoader,
    children: [
      {
        path: '/admin/products',
        element: <AdminProducts />,
        loader: AdminProductsLoader,
      },
      {
        path: '/admin/orders',
        element: <AdminOrders />,
        loader: AdminOrdersLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
