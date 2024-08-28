import React from 'react';
import { Outlet, redirect } from 'react-router-dom';
import SideBar from './components/SideBar';
import { styled } from 'styled-components';
import { getAuthToken } from '../../util/auth';
const AdminLayout = () => {
  return (
    <Container>
      <SideBar />
      <Outlet />
    </Container>
  );
};

export default AdminLayout;

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
        if (resData.user.role === 'admin') {
          return resData.user;
        }
        return redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return redirect('/');
}

const Container = styled.div`
  display: grid;
  grid-template-areas: 'sidebar main';
  width: 100%;
  grid-template-columns: 1fr 4fr;
`;
