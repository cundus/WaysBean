import React, { useContext, useEffect, useState } from "react";
import ImgMock from "../../assets/kopi1.svg";
import "./Cart.css";
import TrashIcon from "../../assets/GroupTrash.svg";

import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import Loader from "../../components/loader/Loader";
import Helmet from "react-helmet";

const CartProduct = ({ item, dispatch }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getProductById();
  }, [item]);

  const getProductById = async () => {
    try {
      const res = await API.get(`/product/${item.id}`);
      console.log("responcart", res);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  console.log("stock :", product.stock);
  console.log("isi item :", item.quantity);

  const saveCart = () => {
    dispatch({
      type: "SAVE_CART",
    });
    dispatch({
      type: "GET_TOTAL_CART",
    });
  };

  const onIncrease = () => {
    if (item.quantity >= product.stock) {
      return item.quantity;
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
      saveCart();
    }
  };

  const onDecrease = () => {
    if (item.quantity > 1) {
      dispatch({
        type: "DECREASE_CART",
        payload: item,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: item,
      });
    }
    saveCart();
  };
  const onRemove = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
    saveCart();
  };

  return product ? (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div className="reviewLeft">
          <img src={product.photo} alt="..." className="thumb-cart" />
          <div className="">
            <p className="fw-bold color-dominant">{product.name}</p>
            <div className="d-flex">
              <span
                className="me-2 fw-bold fs-4 color-dominant cursor-pointer"
                onClick={onDecrease}
              >
                {" "}
                -{" "}
              </span>
              <p className="qty qtyBox">{item.quantity}</p>
              <span
                className="ms-2 fw-bold fs-4 color-dominant cursor-pointer"
                onClick={onIncrease}
              >
                {" "}
                +{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="reviewRight">
          <p className="color-dominant">
            {item.price.toLocaleString("ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <div className="image-right">
            <img
              src={TrashIcon}
              alt=""
              className="trash cursor-pointer"
              onClick={onRemove}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

const Cart = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const { totalCart, cart } = state;

  useEffect(() => {
    dispatch({
      type: "GET_TOTAL_CART",
    });
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Cart | WaysBean</title>
      </Helmet>
      {cart.length > 0 ? (
        <div className="cartContainer">
          <p className="fw-bold fs-4 color-dominant">My Cart</p>
          <div className="d-flex justify-content-between">
            <div className="reviewContainer">
              <p className="fs-5 color-dominant">Review Your Order</p>
              <hr className="solid" />
              {cart.map((item, key) => (
                <CartProduct item={item} key={key} dispatch={dispatch} />
              ))}
              <hr className="solid" />
            </div>
            <div className="proceedContainer mt-5">
              <hr className="solid" />
              {/* <div className="d-flex justify-content-between"> */}
              <div className="d-flex justify-content-between">
                <p className="color-dominant ">Subtotal</p>
                <p className="color-dominant">
                  {totalCart.subtotal.toLocaleString("ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="color-dominant">Qty</p>
                <p className="color-dominant">{totalCart.quantity}</p>
              </div>
              {/* </div> */}
              <hr className="solid" />
              <div className="d-flex justify-content-between">
                <p className="color-dominant text-center">Total</p>
                <p className="color-dominant">
                  {totalCart.total.toLocaleString("ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
              <center>
                <button
                  className="button-dominant px-5 mt-3"
                  onClick={() => history.push("/shipping")}
                >
                  Proceed To Checkout
                </button>
              </center>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center mt-5">
            <p className="fs-4">
              Your Cart Is Empty, Please Check Our Products{" "}
              <span
                className="fw-bold cursor-pointer"
                onClick={() => history.push("/")}
              >
                Here
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
