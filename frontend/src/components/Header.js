import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import CheckOut from './CheckOut';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Inner>
        <Link to={ROUTES.HOME}>
          <Logo src="/images/logo.svg" alt="" />
        </Link>

        <Nav>
          <Link to={ROUTES.CHECKOUT}>
            <CheckOut />
          </Link>
          <User>
            <img src="/images/user.svg" alt="" />
            {user && <span>{user.name}</span>}
            {!user && <span>Tài khoản</span>}
            <Dropdown>
              {user && (
                <Account>
                  {user.role === 'admin' && (
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                  )}
                  <Link to={ROUTES.ORDERS}>Đơn mua</Link>
                  <Link
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch(setUser(null));
                    }}
                  >
                    Đăng xuất
                  </Link>
                </Account>
              )}
              {!user && (
                <>
                  <div>
                    <Link to={ROUTES.LOGIN}>
                      <button>Đăng nhập</button>
                    </Link>
                  </div>
                  <div>
                    <Link to={ROUTES.SIGNUP}>
                      <button>Đăng ký</button>
                    </Link>
                  </div>
                </>
              )}
            </Dropdown>
          </User>
        </Nav>
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1000;
`;

const Account = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  a,
  span {
    transition: color 0.2s;
    cursor: pointer;
    padding: 10px;
    border-bottom: solid 0.5px #000;
  }
  a:last-child {
    border-bottom: none;
  }
  a:hover,
  span:hover {
    color: #004aad;
  }
  span {
    border-bottom: none;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1230px;
  height: 60px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 60px;
  margin-left: 10px;
`;

const Search = styled.div`
  width: 50%;
  height: 38px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 3px;
  border-radius: 5px;
  input {
    width: 100%;
    border: none;
    outline: none;
    @media screen and (max-width: 767px) {
      &::placeholder {
        color: transparent;
      }
    }
  }
  button {
    width: 60px;
    height: 80%;
    background-color: #2ee5ab;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const Nav = styled.nav`
  line-height: 18px;
  font-size: 13px;
  max-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  img {
    width: 18px;
    height: 18px;
    color: #7a7e7f;
  }

  a {
    color: black;
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    column-gap: 50px;
  }

  @media screen and (max-width: 991px) {
    justify-content: flex-end;
    margin-right: 20px;
    span {
      display: none;
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 20px);
  background-color: #fff;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  border-radius: 5px;
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  div {
    width: 100%;
    button {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  div:first-child {
    button {
      background: #004aad;
      color: #fff;
    }
  }

  div:last-child {
    button {
      background-color: transparent;
      border: 2px solid #004aad;
      color: #004aad;
    }
  }
  @media screen and (max-width: 767px) {
    width: 150px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 6px;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default Header;
