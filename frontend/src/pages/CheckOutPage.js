import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import ProductCartItem from '../components/ProductCartItem';
import * as ROUTES from '../constants/routes';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
const CheckOutPage = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const cartPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.user.user);

  return (
    <Container>
      <h1>GIỎ HÀNG</h1>
      {cartItems.length === 0 && (
        <NoItems>
          <img src="./images/no-cart.svg" alt="" />
          <p>Chưa có sản phẩm trong giỏ hàng của bạn.</p>
          <Link to={ROUTES.HOME}>
            <button>mua sắm ngay</button>
          </Link>
        </NoItems>
      )}
      {cartItems.length > 0 && (
        <Inner>
          <LeftSide>
            <Header>
              <div>Số lượng</div>
              <div>Thành tiền</div>
            </Header>
            <ProductCartList>
              {cartItems.map((item) => {
                return <ProductCartItem key={item._id} product={item} />;
              })}
            </ProductCartList>
          </LeftSide>
          <RightSide>
            <TotalPrice>
              <span>Tổng Số Tiền</span>
              {VND.format(cartPrice)}
            </TotalPrice>
            <Link to={ROUTES.LASTSTEPCHECKOUT}>
              <CheckOutBtn>thanh toán</CheckOutBtn>
            </Link>
          </RightSide>
        </Inner>
      )}
    </Container>
  );
};

export default CheckOutPage;

const Container = styled.div`
  max-width: 1230px;
  margin: 80px auto 0;
  p {
    font-size: 14px;
    margin: 20px 0;
  }
  h1 {
    margin-bottom: 20px;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
    font-size: 17px;
  }
`;

const NoItems = styled.div`
  margin-top: 20px;
  width: 100%;
  background: #fff;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    cursor: pointer;
    user-select: none;
    height: 40px;
    width: 220px;
    border: none;
    background: #004aad;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0px 4px 6px hsl(0, 0%, 90%);
    border-radius: 8px;
  }
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 20px;
  column-gap: 15px;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const LeftSide = styled.div`
  height: auto;
  @media screen and (max-width: 991px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 200px;
  }
`;

const RightSide = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: 991px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`;

const Header = styled.div`
  padding-left: 30px;
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 10px;
  padding-right: 100px;
  div {
    margin-left: 50px;
    margin-right: 15px;
    font-weight: 600;
    font-size: 15px;
  }
  @media screen and (max-width: 991px) {
    display: none;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #c92127;
  font-weight: 650;
  font-size: 20px;

  span {
    font-size: 16px;
    color: #333333;
    flex-basis: 65%;
  }
`;

const CheckOutBtn = styled.button`
  width: 100%;
  margin: 20px 0px 0px;
  border: none;
  height: 45px;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  background-color: #004aad;
  color: #fff;
  cursor: pointer;
`;

const ProductCartList = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
`;
