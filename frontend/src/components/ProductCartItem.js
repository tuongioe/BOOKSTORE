import React from 'react';
import { styled } from 'styled-components';
import {
  incrementInCart,
  decrementInCart,
  removeFromCart,
} from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
const ProductCartItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <ProductImage src={`${product.imageUrl}`} alt="" />
      <section>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <div>
            <ProductNewPrice>{VND.format(product.price)}</ProductNewPrice>
            <ProductOldPrice>{VND.format(product.oldprice)}</ProductOldPrice>
          </div>
        </ProductInfo>
        <ProductQty>
          <div>
            <button
              onClick={() => {
                dispatch(decrementInCart(product._id));
              }}
              disabled={product.quantity === 0}
            >
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_minus2x.png"
                alt=""
              />
            </button>
            {product.quantity}
            <button
              onClick={() => {
                dispatch(incrementInCart(product._id));
              }}
            >
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"
                alt=""
              />
            </button>
          </div>
        </ProductQty>
        <ProductTotalPrice>
          {VND.format(product.price * parseInt(product.quantity))}
        </ProductTotalPrice>
      </section>
      <DeleteButton
        onClick={() => {
          dispatch(removeFromCart(product._id));
        }}
      >
        <img src="/images/trash-can.svg" alt="" />
      </DeleteButton>
    </Container>
  );
};

export default ProductCartItem;

const Container = styled.div`
  background-color: #fff;
  padding: 20px 0 20px 100px;
  display: grid;
  grid-template-columns: 2fr 10fr 2fr;
  column-gap: 20px;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ededed;
  &:last-child {
    border-bottom: none;
  }
  section {
    display: flex;
    column-gap: 10px;
    flex-shrink: 0;
    align-items: center;
  }
  @media screen and (max-width: 991px) {
    padding: 20px 0;
    section {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 20px;
    }
  }
`;

const ProductImage = styled.img`
  width: auto;
  max-height: 119px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  /* margin-left: 20px; */
  div {
    display: flex;
    align-items: center;
  }
`;

const ProductQty = styled.div`
  /* margin: 0 50px; */
  margin-left: 20px;
  text-align: center;
  div {
    border: 1px solid #c1c1c1;
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 5px;
    width: 110px;
    padding: 0 10px;
    button {
      cursor: pointer;
      user-select: none;
      border: none;
      outline: none;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 10px;
      }
    }
  }
  @media screen and (max-width: 991px) {
    margin-left: 0;
  }
`;

const ProductTotalPrice = styled.span`
  margin-left: 20px;
  text-align: center;
  color: #c92127;
  font-weight: bold;
  font-size: 15px;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;

const ProductOldPrice = styled.span`
  color: #7a7e7f;
  text-decoration: line-through;
  font-size: 0.95em;
  margin-left: 8px;
`;

const ProductNewPrice = styled.span`
  font-size: 1.2em;
  line-height: 1.2em;
  color: #333;
  font-weight: 650;
  text-align: left;
`;

const ProductTitle = styled.h2`
  font-size: 14px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 80%;
`;

const DeleteButton = styled.button`
  /* position: absolute;
  right: 20px;
  top: 50%;
  translate: -50% -50%; */
  border: none;
  background: transparent;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
    svg {
      color: #2759ae;
    }
  }
`;

const Mobile = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;
