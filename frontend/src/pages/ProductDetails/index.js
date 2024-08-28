import React, { useState, useEffect } from 'react';
import {
  Link,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { styled } from 'styled-components';
import * as ROUTES from '../../constants/routes';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
const ProductDetails = () => {
  const navigate = useNavigate();
  const bookData = useLoaderData();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [modalIsShowed, setModalIsShowed] = useState(false);
  const addToCartHandler = () => {
    const productData = { ...bookData, quantity: quantity };
    dispatch(addToCart(productData));
    setModalIsShowed(true);
  };
  return (
    <>
      <Container>
        <MediaDetails>
          <ProductImg src={bookData.imageUrl} alt="" />
          <ProductActions>
            <button onClick={addToCartHandler}>Thêm vào giỏ hàng</button>
            <button
              onClick={() => {
                addToCartHandler();
                navigate(ROUTES.CHECKOUT);
              }}
            >
              Mua ngay
            </button>
          </ProductActions>
        </MediaDetails>
        <InfoDetails>
          <ProductTitle>{bookData.title}</ProductTitle>
          <ProductAuthor>
            <span>Tác giả:</span> {bookData.author}
          </ProductAuthor>
          <ProductPrices>
            <ProductNewPrice>{VND.format(bookData.price)}</ProductNewPrice>
            <ProductOldPrice>{VND.format(bookData.oldprice)}</ProductOldPrice>
            <ProductSaleOff>-{bookData.saleoff}%</ProductSaleOff>
          </ProductPrices>
          <QuantityActions>
            <span>Số lượng:</span>
            <div>
              <button
                onClick={() => setQuantity((prev) => prev - 1)}
                disabled={quantity === 1}
              >
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_minus2x.png"
                  alt=""
                />
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"
                  alt=""
                />
              </button>
            </div>
          </QuantityActions>
        </InfoDetails>
      </Container>
      {modalIsShowed && (
        <div>
          <Backdrop onClick={() => setModalIsShowed(false)} />
          <Modal>
            <p>Sản phẩm đã được thêm thành công vào giỏ hàng của bạn</p>
            <img src={bookData.imageUrl} alt="" />

            <div>
              <button onClick={() => setModalIsShowed(false)}>Chọn thêm</button>
              <Link to={ROUTES.CHECKOUT}>Thanh toán</Link>
            </div>
          </Modal>
        </div>
      )}
      <Mobile>
        <QuantityActions>
          <span>Số lượng:</span>
          <div>
            <button
              onClick={() => setQuantity((prev) => prev - 1)}
              disabled={quantity === 0}
            >
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_minus2x.png"
                alt=""
              />
            </button>
            {quantity}
            <button onClick={() => setQuantity((prev) => prev + 1)}>
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"
                alt=""
              />
            </button>
          </div>
        </QuantityActions>
        <ProductActions>
          <button onClick={addToCartHandler}>Thêm vào giỏ hàng</button>
          <button
            onClick={() => {
              addToCartHandler();
              navigate(ROUTES.CHECKOUT);
            }}
          >
            Mua ngay
          </button>
        </ProductActions>
      </Mobile>
    </>
  );
};

export default ProductDetails;

const Container = styled.div`
  max-width: 1230px;
  background-color: #fff;
  margin: 90px auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  padding: 20px;
  column-gap: 100px;
  @media screen and (max-width: 991px) {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    column-gap: 50px;
    margin-top: 60px;
  }
`;

const MediaDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoDetails = styled.div``;

const ProductImg = styled.img`
  max-width: 100%;
  max-height: 392px;
  min-width: 392px;
`;

const ProductActions = styled.div`
  margin-top: 20px;
  display: flex;
  column-gap: 20px;

  button {
    cursor: pointer;
    height: 44px;
    width: 220px;
    border-radius: 8px;
    border: none;
    background: #fff;
    font-weight: 900;
  }

  button:first-child {
    border: 2px solid #004aad;
    color: #004aad;
  }

  button:nth-child(2) {
    background-color: #004aad;
    color: #fff;
  }

  @media screen and (max-width: 991px) {
    display: none;
  }
`;

const ProductTitle = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: #333;
  line-height: 1.5em;
  overflow-wrap: break-word;
  padding-bottom: 16px;
  margin: 50px 0 0;
`;

const ProductPrices = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;

  span {
    font-size: 18px;
    font-weight: 650;
    padding: 0 8px 0 0;
    margin-bottom: 0;
    text-align: left;
    max-width: 200px;
    min-width: 150px;
  }

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
      border: none;
      outline: none;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        width: 10px;
      }
    }
  }
  @media screen and (max-width: 991px) {
    display: none;
  }
`;

const ProductNewPrice = styled.span`
  font-size: 32px;
  line-height: 32px;
  color: #c92127;
  font-family: 'Roboto', sans-serif !important;
  font-weight: 700;
`;

const ProductOldPrice = styled.span`
  text-decoration: line-through;
  margin-left: 8px;
  color: #0d0e0f;
  font-weight: 300;
  padding-left: 5px;
`;

const ProductSaleOff = styled.span`
  margin-left: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: #004aad;
  color: #fff;
  font-size: 1em;
  font-weight: 600;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 306px;
  height: 306px;
  background: #fff;
  z-index: 10000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50%;
  }

  p {
    text-align: center;
  }

  div {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    button,
    a {
      width: 40%;
      background-color: #004aad;
      border: none;
      height: 25px;
      font-size: 15px;
      color: #fff;
      font-weight: 600;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 991px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 60px;
    display: grid;
    background-color: #fff;
    grid-template-columns: 1fr 2fr;
    box-shadow: 0px -2px 4px #0000001a;
    ${QuantityActions} {
      display: inline-block;
      margin-top: 0;
      div {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        border-right: 1px solid #eee;
      }
      span {
        display: none;
        color: #0d0e0f;
        font-weight: 900;
      }
    }
    ${ProductActions} {
      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: 0;
      width: 100%;
      margin-top: 0;
      button {
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: none;
      }
    }
  }
`;

const ProductAuthor = styled.div`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  span {
    font-weight: 600;
    font-size: 16px;
  }
`;
