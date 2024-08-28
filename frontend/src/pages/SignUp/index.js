import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useActionData, useSubmit } from 'react-router-dom';

const SignUpPage = () => {
  const error = useActionData();
  const submit = useSubmit();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [formValidity, setFormValidity] = useState({
    emailValid: true,
    passwordValid: true,
    rePasswordValid: true,
    nameValid: true,
  });
  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmailIsValid = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const enteredPasswordIsValid = password.length >= 6;
    const enteredRePasswordIsValid = rePassword === password;
    const enteredName = name !== '';
    setFormValidity({
      emailValid: enteredEmailIsValid,
      passwordValid: enteredPasswordIsValid,
      rePasswordValid: enteredRePasswordIsValid,
    });
    const formIsValid =
      enteredEmailIsValid && enteredPasswordIsValid && rePassword;
    if (!formIsValid) {
      return;
    }

    submit(
      { name: name, email: email, password: password, rePassword: rePassword },
      { method: 'POST', encType: 'application/json' }
    );

    setEmail('');
    setPassword('');
    setRePassword('');
    setName('');
    setFormValidity({
      emailValid: true,
      passwordValid: true,
      rePasswordValid: true,
      nameValid: true,
    });
  };
  return (
    <Container>
      <h1>Đăng ký</h1>
      <Form onSubmit={SubmitHandler}>
        {error && <ServerError>{error.data[0].msg}</ServerError>}
        <InputBlock>
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            type="text"
            placeholder="Nhập email"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            autoComplete="off"
          />
          {!formValidity.emailValid && (
            <Error>Họ và tên không được để trống</Error>
          )}
        </InputBlock>
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
        <InputBlock>
          <Label htmlFor="rePassword">Nhập lại mật khẩu</Label>
          <Input
            type="password"
            placeholder="Nhập lại mật khẩu"
            id="rePassword"
            name="rePassword"
            autoComplete="off"
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
          />
          {!formValidity.rePasswordValid && (
            <Error>Nhập lại mật khẩu không khớp</Error>
          )}
        </InputBlock>
        <Button type="submit">Đăng ký</Button>
      </Form>
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

const Form = styled.form`
  max-width: 318px;
  margin: 0 auto;
  padding: 24px 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-weight: 900;
  color: #fff;
`;

const Error = styled.p`
  font-weight: 600;
  font-size: 15px;
  color: red;
  position: absolute;
  bottom: -35px;
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

export default SignUpPage;
