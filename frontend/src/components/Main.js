import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Main = ({ books }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 12;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(books.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(books.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, books]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % books.length;
    setItemOffset(newOffset);
  };
  return (
    <Container>
      <BooksList>
        {currentItems &&
          currentItems.map((book) => (
            <Link key={book._id} to={`/product/${book._id}`}>
              <BookItem BookInfo={book} />
            </Link>
          ))}
      </BooksList>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-btn"
        nextLinkClassName="page-btn"
      />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  grid-area: main;
  background: #fff;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 20px 10px;
    width: 100%;
    margin-top: 20px;
  }

  .pagination {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    column-gap: 20px;
    padding: 0;

    .page-num {
      background-color: #fff;
      font-weight: 700;
      min-width: 30px;
      display: inline-block;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }

    .selected .page-num {
      background-color: #004aad;
      color: #fff;
    }

    .disabled .page-btn {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .page-btn {
      background-color: #004aad;
      display: inline-block;
      min-width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }
  }
`;

const BooksList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
