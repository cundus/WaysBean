import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UploadIcon from "../../assets/UploadIcon.svg";
import LogoIcon from "../../assets/Iconlogo.svg";

import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import "./shipping.css";
import { API } from "../../config/api";
import Loader from "../../components/loader/Loader";
import PopUp from "../../components/modals/PopUp";
import Helmet from "react-helmet";

const Shipping = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const { totalCart, cart } = state;
  const [showPop, setShowPop] = useState(false);

  const [attachment, setAttachment] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    postCode: "",
    address: "",
  });
  console.log(data);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const closePop = () => {
    setShowPop(false);
    history.push("/profile");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!attachment || attachment === null) {
        return alert("Payment Attachment is Required!");
      }

      const products = JSON.stringify(
        state.cart.map((item) => {
          return { id: item.id, orderQuantity: item.quantity };
        })
      );

      const body = new FormData();
      body.append("name", data.name);
      body.append("address", data.address);
      body.append("codePost", data.postCode);
      body.append("phone", data.phone);
      body.append("email", data.email);
      body.append("attachment", attachment);
      body.append("products", products);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      await API.post("/add-transaction", body, config);
      setShowPop(true);
      dispatch({
        type: "RESET_CART",
      });
    } catch (error) {
      console.log(error);
      alert("CheckOut Tidak Berhasil");
    }
  };

  return (
    <div className="container-shipping">
      <Helmet>
        <title>Shipping | WaysBean</title>
      </Helmet>
      <div className="form-shipping">
        <p className="fs-3 fw-bold color-dominant">Shipping</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="ControlInput1">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              className="form-dominant color-dominant"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlInput2">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="form-dominant color-dominant"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlInput3">
            <Form.Control
              required
              minLength={11}
              type="number"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              className="form-dominant color-dominant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ControlInput4">
            <Form.Control
              type="number"
              required
              name="postCode"
              placeholder="Post Code"
              onChange={handleChange}
              className="form-dominant color-dominant"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              required
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="form-dominant color-dominant"
            />
          </Form.Group>

          <div className="form-dominant color-dominant uploadForm mb-3 medium-form-width">
            <label htmlFor="upload" className="d-flex justify-content-between">
              {attachment ? attachment.name : "Attachment of Transaction"}{" "}
              <img src={UploadIcon} alt="upload" width="15px" />
            </label>
            <input
              required
              type="file"
              hidden
              id="upload"
              name="attachment"
              onChange={(e) => {
                setAttachment(e.target.files[0]);
              }}
            />
          </div>
        </Form>{" "}
      </div>
      <div className="product-card">
        <div>
          {cart.map((item, index) => (
            <div>
              <ProductCard item={item} key={index} />
            </div>
          ))}
        </div>
        <center>
          <Button
            className="button-dominant fullwidth mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Pay
          </Button>
        </center>
        <PopUp
          show={showPop}
          hide={closePop}
          message={
            "Thank you for ordering in us, please wait 1 x 24 hours to verify you order"
          }
        />
      </div>
    </div>
  );
};

export const ProductCard = ({ item, index }) => {
  //FETCH DATA
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await API.get(`/product/${item.id}`);
        // console.log("responcart", res.data.data.price);
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, []);

  console.log(product.price);
  // GET DATE
  const today = moment().format("dddd");
  const todayDate = moment().format("D MMMM YYYY");

  //SUM SUB TOTAL
  let subtotal = "";
  let price = "";
  if (product !== null) {
    subtotal = product.price * item.quantity;
  }
  //   console.log(subtotal);

  return product ? (
    <div className="productCardContainer">
      <div className="leftCard">
        <img src={product.photo} alt="" className="cardImage" />
        <div className="cardBody">
          <p className="cardBody-name">{product.name}</p>
          <p className="cardBody-date">
            <span className="fw-bold">{today}</span>, {todayDate}
          </p>
          <p className="cardBody-price">
            Price :{" "}
            {product.price?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <p className="cardBody-quantity">Qty : {item.quantity}</p>
          <p className="cardBody-sub">
            Sub Total :{" "}
            {subtotal.toLocaleString("ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
      <div className="right-log">
        <img src={LogoIcon} alt="waysbean" style={{ width: "5rem" }} />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Shipping;
