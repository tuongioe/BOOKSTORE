import React from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
const CheckOut = () => {
  const cartProdQty = useSelector((state) => state.cart.products.length);
  return (
    <Container>
      <Badge>
        <img src="/images/cart.svg" alt="" />
        {cartProdQty !== 0 && <span>{cartProdQty}</span>}
      </Badge>
      <span>Giỏ hàng</span>
    </Container>
  );
};

export default CheckOut;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badge = styled.div`
  position: relative;
  span {
    position: absolute;
    display: inline-block;
    top: -8px;
    right: -8px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    font-size: 12px;
    display: flex;
    color: #fff;
    align-items: center;
    font-weight: 700;
    justify-content: center;
  }
`;
