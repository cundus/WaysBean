import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import PopUp from "../../components/modals/PopUp";
import SignIn from "../../components/modals/SignIn";
import Signup from "../../components/modals/Signup";
import { API } from "../../config/api";
import { UserContext } from "../../context/UserContext";

import "./Detail.css";

const DetailProduct = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const { cart } = state;
  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState("");
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/product/${id}`);
        // console.log(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("Cannot Get Detail");
      }
    };
    getProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Loader />
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { price: data.price, id },
    });
    dispatch({
      type: "SAVE_CART",
    });
    setShowPop(true);
    setMessage("Product Succesfully Added To Cart");
  };

  const onAdd = () => {
    if (state.isLogin) {
      const isInCart = cart.filter((product) => product.id === id);
      if (isInCart.length > 0) {
        isInCart.map((product) => {
          if (product.quantity >= data.stock) {
            setShowPop(true);
            setMessage(
              "Cannot add more quantity, the number of your order exceeds the number of available stock"
            );

            return product;
          } else {
            addToCart();
          }
        });
      } else {
        addToCart();
      }
    } else {
      setShowSignin(true);
    }
  };

  return (
    <div className="detail-container">
      <Helmet>
        <title>Detail Product | WaysBean</title>
      </Helmet>
      <div className="left-detail">
        <img src={data.photo} alt="photo" className="photo-detail" />
      </div>
      <div className="right-detail ">
        <h1 className="fw-bold  color-dominant">{data.name}</h1>
        <p className="color-dominant">Stock : {data.stock}</p>
        <p className="description-container">{data.description}</p>
        <p className="fs-5 fw-bold color-dominant d-flex flex-row-reverse">
          {data.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        {state.isLogin && state.user.role_id === 1 ? null : (
          <button onClick={onAdd} className="button-dominant mt-3  fullwidth">
            Add To Cart
          </button>
        )}
      </div>
      <PopUp show={showPop} hide={() => setShowPop(false)} message={message} />
      <SignIn
        showSignin={showSignin}
        setShowSignin={setShowSignin}
        dispatch={dispatch}
        setShowSignup={setShowSignup}
      />
      <Signup
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        setShowSignin={setShowSignin}
      />
    </div>
  );
};

export default DetailProduct;
