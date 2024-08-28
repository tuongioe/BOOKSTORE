import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
  redirect,
  useSubmit,
  Form,
  useActionData,
  useNavigate,
  Link,
} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { loader as TokenLoader } from '../../util/auth';
import { getAuthToken } from '../../util/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValidity, setFormValidity] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const SubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmailIsValid = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const enteredPasswordIsValid = password.length >= 6;
    console.log(enteredPasswordIsValid);
    setFormValidity({
      emailValid: enteredEmailIsValid,
      passwordValid: enteredPasswordIsValid,
    });
    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
    if (!formIsValid) {
      return;
    }
    let response;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        response = res;
        return res.json();
      })
      .then((resData) => {
        if (response.status === 401) {
          setError(resData);
          setEmail('');
          setPassword('');
          setFormValidity({ emailValid: true, passwordValid: true });
        } else {
          localStorage.setItem('token', resData.token);
          return resData.token;
        }
      })
      .then((token) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch user.');
        }
        return res.json();
      })
      .then((resData) => {
        dispatch(setUser(resData.user));
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <h1>Đăng nhập</h1>
      <FormBlock onSubmit={SubmitHandler}>
        {error && <ServerError>{error.message}</ServerError>}
        <InputBlock>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            placeholder="Nhập email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
          />
          {!formValidity.emailValid && <Error>Vui lòng nhập đúng email</Error>}
        </InputBlock>
        <InputBlock>
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {!formValidity.passwordValid && (
            <Error>Vui lòng nhập đúng mật khẩu (kí tự >= 6)</Error>
          )}
        </InputBlock>
        <Link to={ROUTES.SIGNUP}>Bạn chưa có tài khoản?</Link>
        <Button type="submit">Đăng nhập</Button>
      </FormBlock>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1230px;
  background-color: #fff;
  margin: 70px auto 0;
  padding: 30px;
  text-align: center;
`;

const FormBlock = styled.form`
  max-width: 318px;
  margin: 0 auto;
  padding: 24px 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-align: left;
    color: #15a6fb;
    font-size: 14px;
    font-weight: 500;
    margin-top: 20px;
  }
  a:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 991px) {
    width: 100vh;
  }
`;

const Input = styled.input`
  height: 30px;
  padding: 4px 17px;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0.25rem;
`;
const Label = styled.label`
  padding: 4px;
  margin-bottom: 5px;
  text-align: left;
  font-weight: 600;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  margin-bottom: 20px;
  position: relative;
`;

const Button = styled.button`
  padding: 8px 0;
  margin: 30px auto 8px;
  text-align: center;
  width: 245px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #004aad;
  color: #fff;
  font-weight: 900;
`;

const Error = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: red;
  position: absolute;
  bottom: -30px;
  text-align: left;
`;

const ServerError = styled.div`
  margin-bottom: 20px;
  width: 100%;
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  float: left;
  padding: 20px 30px;
  color: #cc0033;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
`;

export default LoginPage;
