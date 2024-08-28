import React, { useState, useEffect } from 'react';
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import { styled } from 'styled-components';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const AdminProducts = () => {
  const navigate = useNavigate();
  const productsData = useLoaderData();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('manga');
  const [oldprice, setOldprice] = useState(0);
  const [newprice, setNewprice] = useState(0);
  const [saleoff, setSaleoff] = useState('');
  const [image, setImage] = useState('');
  const [formIsShow, setFormIsShow] = useState(false);
  const [isEdited, setIsEdited] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [toastShowing, setToastShowing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const TimeOut = setTimeout(() => {
      setToastShowing(false);
    }, 1000);
    return () => {
      clearTimeout(TimeOut);
    };
  }, [toastShowing]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('oldprice', oldprice);
    formData.append('price', oldprice - oldprice * (saleoff / 100));
    formData.append('saleoff', saleoff);
    formData.append('image', image);
    if (isEdited) {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/update-product/` +
          isEdited,
        {
          method: 'PUT',
          body: formData,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          setMessage('Cập nhật sản phẩm');
          setToastShowing(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/products/post-product`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          setMessage('Thêm sản phẩm');
          setToastShowing(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setFormIsShow(false);
    setTitle('');
    setAuthor('');
    setNewprice('');
    setOldprice('');
    setSaleoff('');
    setIsEdited(null);
    setImage('');
  };

  return (
    <Container>
      {toastShowing && (
        <Toast>
          <div className="toast active">
            <div className="toast-content">
              <div className="message">
                <span className="text text-1">Success</span>
                <span className="text text-2">{message} thành công</span>
              </div>
            </div>
            <div className="progress active"></div>
          </div>
        </Toast>
      )}
      {formIsShow && (
        <Backdrop>
          <AddForm onSubmit={submitHandler} encType="multipart/form-data">
            <InputBlock>
              <Label htmlFor="name">Tiêu đề</Label>
              <Input
                type="text"
                placeholder="Nhập tiêu đề"
                id="name"
                name="name"
                value={title || ''}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoComplete="off"
                required
              />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="name">Tác giả</Label>
              <Input
                type="text"
                placeholder="Nhập tác giả"
                id="name"
                name="name"
                value={author || ''}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                autoComplete="off"
                required
              />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="category">Thể loại</Label>
              <select
                id="category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={category || 'manga'}
              >
                <option value="manga">Manga</option>
                <option value="van-hoc">Văn học</option>
                <option value="thieu-nhi">Thiếu nhi</option>
              </select>
            </InputBlock>
            <InputBlock>
              <Label htmlFor="oldprice">Giá tiền</Label>
              <Input
                type="number"
                placeholder="Nhập giá tiền "
                id="oldprice"
                name="oldprice"
                value={oldprice || ''}
                onChange={(e) => {
                  setOldprice(e.target.value);
                }}
                autoComplete="off"
                required
              />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="saleoff">Giảm giá</Label>
              <Input
                type="number"
                placeholder="Nhập % giảm giá"
                id="saleoff"
                name="saleoff"
                value={saleoff || ''}
                onChange={(e) => {
                  setSaleoff(e.target.value);
                }}
                autoComplete="off"
              />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="newprice">Giá khuyến mãi</Label>
              <Input
                type="number"
                id="newprice"
                name="newprice"
                value={oldprice - oldprice * (saleoff / 100)}
                autoComplete="off"
                required
                disabled
              />
            </InputBlock>
            <InputBlock>
              <Label htmlFor="image">Hình ảnh</Label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
              {image && (
                <img
                  id="frame"
                  src={URL.createObjectURL(image)}
                  width="100px"
                  height="100px"
                />
              )}
            </InputBlock>
            <FormActions>
              <CancelButton
                onClick={() => {
                  setFormIsShow(false);
                  setTitle('');
                  setAuthor('');
                  setNewprice('');
                  setOldprice('');
                  setSaleoff('');
                  setIsEdited(null);
                  setImage('');
                }}
                type="button"
              >
                Cancel
              </CancelButton>
              <SubmitButton>Submit</SubmitButton>
            </FormActions>
          </AddForm>
        </Backdrop>
      )}

      <NewProductBtn onClick={() => setFormIsShow(true)}>
        <img src="/images/plus.svg" alt="" />
        Thêm sản phẩm
      </NewProductBtn>
      {products.length === 0 && (
        <NoProducts>
          <img src="/images/no-products.svg" alt="" />
          <span>Không có sản phẩm nào</span>
        </NoProducts>
      )}
      {products.length !== 0 && (
        <ProductsList>
          {products.map((product) => (
            <ProductItem key={product._id}>
              <img src={`${product.imageUrl}`} alt="" />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductAuthor>Tác giả: {product.author}</ProductAuthor>
                <ProductPrice>
                  Giá mới: {VND.format(product.price)}
                </ProductPrice>
                <ProductOldPrice>
                  Giá cũ: {VND.format(product.oldprice)}
                </ProductOldPrice>
                <ProductSaleOff>Giảm giá: {product.saleoff}%</ProductSaleOff>
              </ProductInfo>
              <Actions>
                <button
                  onClick={() => {
                    setTitle(product.title);
                    setAuthor(product.author);
                    setNewprice(product.price);
                    setOldprice(product.oldprice);
                    setSaleoff(product.saleoff);
                    setCategory(product.category);
                    setFormIsShow(true);
                    setIsEdited(product._id);
                  }}
                >
                  <img src="/images/edit.svg" alt="" />
                </button>
                <button
                  onClick={() => {
                    fetch(
                      'http://localhost:8080/products/delete-product/' +
                        product._id,
                      { method: 'DELETE' }
                    )
                      .then((res) => {
                        return res.json();
                      })
                      .then((resData) => {
                        setMessage('Xoá sản phẩm');
                        setToastShowing(true);
                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <img src="/images/admin-trash-can.svg" alt="" />
                </button>
              </Actions>
            </ProductItem>
          ))}
        </ProductsList>
      )}
    </Container>
  );
};

export default AdminProducts;

const Container = styled.div`
  grid-area: main;
  padding: 100px 20px;
  width: 80%;
  margin: 0 auto;
`;

const ProductsList = styled.ul`
  list-style: none;
  width: 100%;
  height: 500px;
  border: 5px solid rgba(0, 0, 0, 0.09);
  overflow: scroll;
  padding: 20px;
`;

const ProductItem = styled.li`
  margin-bottom: 10px;
  border-radius: 20px;
  height: 150px;
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 6fr 1fr;
  /* align-items: center; */
  background-color: #fff;
  img {
    width: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
`;

const ProductTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const ProductPrice = styled.span``;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    border: none;
    background: transparent;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  button:first-child {
    width: 35px;
    height: 35px;
  }
`;

const ProductAuthor = styled.span``;

const ProductOldPrice = styled.span``;

const ProductSaleOff = styled.span``;

const NewProductBtn = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  border-radius: 999px;
  font-weight: bold;
  color: #fff;
  background-color: #004aad;
  border: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  img {
    width: 20px;
    height: 20px;
  }
`;

const AddForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 500px;
  height: 30px;
  padding: 4px 17px;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0.25rem;
`;
const Label = styled.label`
  font-size: 14px;
  color: #333333;
  width: 150px;
  padding: 4px;
  margin-bottom: 5px;
  text-align: left;
  font-weight: 500;
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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  background-color: #004aad;
  color: #fff;
  font-weight: 600;
  border-radius: 999px;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  background-color: #ddd;
  color: #333;
  font-weight: 600;
  border-radius: 999px;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 40px;
`;

const Toast = styled.div`
  .toast {
    position: absolute;
    top: 10px;
    right: 30px;
    border-radius: 12px;
    color: #3c763d;
    background-color: #dff0d8;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  }

  .toast.active {
    transform: translateX(0%);
  }

  .toast .toast-content {
    display: flex;
    align-items: center;
  }

  .toast-content .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    min-width: 35px;
    background-color: #4070f4;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
  }

  .toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }

  .message .text {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }

  .message .text.text-1 {
    font-weight: 600;
    color: #333;
  }

  .toast .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
  }

  .toast .close:hover {
    opacity: 1;
  }

  .toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
  }

  .toast .progress:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #3c763d;
  }

  .progress.active:before {
    animation: progress 1s linear forwards;
  }

  @keyframes progress {
    100% {
      right: 100%;
    }
  }
`;

const NoProducts = styled.div`
  margin-top: 50px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  img {
    width: 150px;
    height: 150px;
  }
  span {
    font-size: 20px;
    font-weight: 600;
  }
`;
