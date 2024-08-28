import React from 'react';
import { styled } from 'styled-components';

const LeftSide = (props) => {
  const CategoryHandler = (e) => {
    const category = e.target.value;
    props.onCategoryChange(category);
  };

  const PriceHandler = (e) => {
    const price = e.target.value;
    props.onPriceChange(price);
  };

  return (
    <Container>
      <Inner>
        <h2>THỂ LOẠI</h2>
        <Category>
          <CategoryItem>
            <input
              type="radio"
              id="thieu-nhi"
              name="category"
              value="thieu-nhi"
              onClick={CategoryHandler}
            />
            <label htmlFor="thieu-nhi">Thiếu Nhi</label>
          </CategoryItem>
          <CategoryItem>
            <input
              type="radio"
              id="van-hoc"
              name="category"
              value="van-hoc"
              onClick={CategoryHandler}
            />
            <label htmlFor="van-hoc">Văn học</label>
          </CategoryItem>
          <CategoryItem>
            <input
              type="radio"
              id="manga"
              name="category"
              value="manga"
              onClick={CategoryHandler}
            />
            <label htmlFor="manga">Manga</label>
          </CategoryItem>
        </Category>
        <h2>GIÁ</h2>
        <PriceList>
          <PriceItem>
            <input
              type="radio"
              id="0-15"
              name="price"
              value="0-150000"
              onClick={PriceHandler}
            />
            <label htmlFor="0-15"> 0đ - 150000đ</label>
            <span></span>
          </PriceItem>
          <PriceItem>
            <input
              type="radio"
              id="15-30"
              name="price"
              value="150000-300000"
              onClick={PriceHandler}
            />
            <label htmlFor="15-30"> 150000đ - 300000đ</label>
            <span></span>
          </PriceItem>
          <PriceItem>
            <input
              type="radio"
              id="30-50"
              name="price"
              value="300000-500000"
              onClick={PriceHandler}
            />
            <label htmlFor="30-50"> 300000đ - 500000đ</label>
            <span></span>
          </PriceItem>
          <PriceItem>
            <input
              type="radio"
              id="50-70"
              name="price"
              value="500000-700000"
              onClick={PriceHandler}
            />
            <label htmlFor="50-70"> 500000đ - 700000đ</label>
            <span></span>
          </PriceItem>
          <PriceItem>
            <input
              type="radio"
              id="70"
              name="price"
              value="700000"
              onClick={PriceHandler}
            />
            <label htmlFor="70"> 700000đ - Trở lên</label>
            <span></span>
          </PriceItem>
        </PriceList>
      </Inner>
    </Container>
  );
};

export default LeftSide;

const Container = styled.div`
  grid-area: leftside;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  h2 {
    cursor: pointer;
    text-transform: uppercase;
    line-height: 100%;
    padding: 0;
    text-align: left;
    font-weight: 600;
    margin: 0px;
    font-size: 13px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;

const CategoryItem = styled.li`
  margin: 10px 0;
  list-style: none;

  input {
    display: none;
  }

  label {
    font-size: 14px;
    text-transform: capitalize;
    color: #666;
  }

  input:checked + label {
    color: #004aad;
    font-weight: bold;
    font-size: 14px;
  }
`;

const Category = styled.ul`
  padding-bottom: 20px;
  border-bottom: 2px solid #f6f6f6;
`;
const PriceList = styled.ul``;

const PriceItem = styled(CategoryItem)`
  position: relative;
  span {
    position: absolute;
    top: 5px;
    left: -15px;
    width: 10px;
    height: 10px;
    background-color: transparent;
    border: 1px solid #666;
  }

  input:checked ~ span {
    background: #004aad;
  }

  span:after {
    content: '';
    position: absolute;
    display: none;
    left: 1px;
    top: -1px;
    width: 2px;
    height: 5px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  input:checked ~ span:after {
    display: block;
  }
`;
