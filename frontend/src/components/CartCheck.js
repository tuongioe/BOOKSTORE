import React from 'react';
import { styled } from 'styled-components';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const CartCheck = ({ product }) => {
  return (
    <>
      <Container>
        <div>
          <Image src={`${product.imageUrl}`} alt="" />
          <Title>{product.title}</Title>
        </div>
        <div>
          <Prices>
            <NewPrice>{VND.format(product.price)}</NewPrice>
            <OldPrice>{VND.format(product.oldprice)}</OldPrice>
          </Prices>
          <Quantity>
            <span>Số lượng: </span>
            {product.quantity}
          </Quantity>
          <TotalPrice>
            {' '}
            {VND.format(product.price * parseInt(product.quantity))}
          </TotalPrice>
        </div>
      </Container>
      <Mobile>
        <div>
          <Image src={`${product.imageUrl}`} alt="" />
        </div>
        <div>
          <Title>{product.title}</Title>
          <Prices>
            <NewPrice>{VND.format(product.price)}</NewPrice>
            <OldPrice>{VND.format(product.oldprice)}</OldPrice>
          </Prices>
          <Quantity>
            <span>Số lượng: </span>
            {product.quantity}
          </Quantity>
          <TotalPrice>
            {' '}
            {VND.format(product.price * parseInt(product.quantity))}
          </TotalPrice>
        </div>
      </Mobile>
    </>
  );
};

export default CartCheck;

const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 991px) {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ced4da;
    row-gap: 20px;
  }
`;

const Title = styled.h3`
  font-weight: normal;
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ced4da;
  div {
    display: flex;
  }

  @media screen and (max-width: 991px) {
    display: none;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 145px;
`;

const Prices = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  @media screen and (max-width: 991px) {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }
`;

const OldPrice = styled.span`
  color: #bfbfbf;
  text-decoration: line-through;
  font-size: 0.95em;
`;

const NewPrice = styled.span`
  @media screen and (max-width: 991px) {
    color: #f39801;
    font-weight: 900;
  }
`;

const Quantity = styled.span`
  width: 100px;
  text-align: center;
  font-size: 15px;
  span {
    display: none;
  }
  @media screen and (max-width: 991px) {
    display: inline-block;
    text-align: left;
    margin-top: 20px;
    span {
      display: inline-block;
    }
  }
`;

const TotalPrice = styled.span`
  width: 100px;
  color: #f39801;
  font-weight: 600;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;
