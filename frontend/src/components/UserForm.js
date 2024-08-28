import React, { useState } from 'react';
import { styled } from 'styled-components';

const UserForm = ({ setAddress, setName, setPhoneNumber, submitHandler }) => {
  return (
    <Form onSubmit={submitHandler}>
      <InputBlock>
        <Label htmlFor="name">Họ và tên người nhận</Label>
        <Input
          type="text"
          placeholder="Nhập họ và tên người nhận"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoComplete="off"
          required
        />
      </InputBlock>
      <InputBlock>
        <Label htmlFor="phoneNumber">Số điện thoại</Label>
        <Input
          type="text"
          placeholder="Ví dụ: 0123456xxx (10 ký tự số)"
          id="phoneNumber"
          name="phoneNumber"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          autoComplete="off"
          required
        />
      </InputBlock>
      <InputBlock>
        <Label htmlFor="address">Địa chỉ nhận hàng</Label>
        <Input
          type="text"
          placeholder="Nhập địa chỉ nhận hàng"
          id="address"
          name="address"
          autoComplete="off"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          required
        />
      </InputBlock>
    </Form>
  );
};

export default UserForm;

const Form = styled.form`
  padding: 0px 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 100%;
  }
`;
const Input = styled.input`
  width: 500px;
  height: 30px;
  padding: 4px 17px;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0.25rem;
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 100%;
  }
`;
const Label = styled.label`
  font-size: 14px;
  color: #333333;
  width: 150px;
  padding: 4px;
  margin-bottom: 5px;
  text-align: left;
`;
const InputBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 8px 0;
  margin-bottom: 20px;
  position: relative;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Button = styled.button`
  padding: 8px 0;
  margin: 30px auto 8px;
  text-align: center;
  width: 245px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #2ee5ab;
  font-weight: 900;
`;

const Error = styled.p`
  font-weight: 600;
  color: red;
  position: absolute;
  bottom: -35px;
`;
