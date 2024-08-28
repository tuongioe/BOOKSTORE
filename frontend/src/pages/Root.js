import React, { useEffect } from 'react';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ErrorPage from './ErrorPage';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const RootLayout = () => {
  const navigate = useNavigate();
  const user = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
