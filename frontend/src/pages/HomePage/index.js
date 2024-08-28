import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import LeftSide from '../../components/Category';
import Main from '../../components/Main';
import {
  useLoaderData,
  useRouteLoaderData,
  useNavigate,
} from 'react-router-dom';

let filteredBooks = [];
let filteredBooksByPrice = [];
let filteredBooksByCategory = [];

const HomePage = () => {
  const initialBooks = useLoaderData();

  const [books, setBooks] = useState(initialBooks);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);

  const PriceChangeHandler = (price) => {
    setPrice(price);
  };

  const CategoryChangeHandler = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    if (price) {
      const prices = price.split('-');
      const min = parseFloat(prices[0]);
      const max = parseFloat(prices[1]);
      filteredBooksByPrice = initialBooks.filter((book) =>
        max ? book.price >= min && book.price <= max : book.price >= min
      );
    }

    if (category) {
      filteredBooksByCategory = initialBooks.filter(
        (book) => book.category === category
      );
    }
    if (price || category) {
      if (!price) {
        filteredBooks = filteredBooksByCategory;
      } else if (!category) {
        filteredBooks = filteredBooksByPrice;
      } else {
        filteredBooks = filteredBooksByCategory.filter((item) =>
          filteredBooksByPrice.includes(item)
        );
      }

      console.log('filteredBooks', filteredBooks);
      setBooks(filteredBooks);
    }
  }, [price, category]);

  return (
    <Container>
      <LeftSide
        onPriceChange={PriceChangeHandler}
        onCategoryChange={CategoryChangeHandler}
      />
      {console.log('books', books)}
      <Main books={books} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: 'leftside main';
  grid-template-columns: minmax(0, 2fr) minmax(0, 5fr);
  max-width: 1230px;
  height: 1000px;
  margin: 90px auto;
  column-gap: 20px;

  @media screen and (max-width: 991px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }
`;
export default HomePage;
