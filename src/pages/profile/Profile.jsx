import moment from "moment";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { API } from "../../config/api";

import LogoIcon from "../../assets/Iconlogo.svg";
import PhotoPlaceholder from "../../assets/Profile.png";
import QRC from "../../assets/qrcode.svg";
import "./Profile.css";
import { Helmet } from "react-helmet";
import BtnComplete from "../../assets/BtnComplete.png";

const Profile = () => {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getUser();
  }, [status]);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const resProfile = await API.get("/user/profile");
      const resTransaction = await API.get("/user/transactions");

      console.log("get Product", resTransaction, resProfile);
      setProduct(resTransaction.data.data);
      setUser(resProfile.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
  };

  console.log("state USer", product);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-5">
      <Helmet>
        <title>Profile | WaysBean</title>
      </Helmet>
      <div className="d-flex justify-content-evenly ">
        <div className="">
          <p className="title-profile">My Profile</p>
          <div className="d-flex">
            <div>
              <img
                src={!user.photo ? PhotoPlaceholder : user.photo}
                alt="user"
                className="profile-pic"
              />
            </div>
            <div className="">
              <p className="profile-field">Name</p>
              <p className="profile-field-content">{user.name}</p>
              <p className="profile-field">Email</p>
              <p className="profile-field-content">{user.email}</p>
            </div>
          </div>
        </div>
        <div
          className=""
          style={{ overflow: "auto", maxHeight: "80vh", width: "31.5rem" }}
        >
          <p className="title-profile">My Transaction</p>
          <div>
            {product
              ? product.map((transaction, index) =>
                  transaction.Products.map((item) => (
                    <ProductCard
                      item={item}
                      transaction={transaction}
                      setStatus={setStatus}
                      key={index + 1}
                    />
                  ))
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ item, transaction, setStatus }) => {
  const status = transaction.status;

  //SUM SUB TOTAL
  const subtotal = item.price * item.orderQuantity.value;

  // GET DATE
  const today = moment().format("dddd");
  const todayDate = moment().format("D MMMM YYYY");

  // Action For Complete
  const onAction = async (value, e) => {
    e.preventDefault();
    const body = { ...transaction, status: value };
    await API.patch(`/user/edit-transaction/${transaction.id}`, body);
  };
  //   console.log(item, transaction);

  return (
    <div className="productCardContainer">
      <div className="leftCard">
        <img src={item.photo} alt="" className="cardImage" />
        <div className="cardBody">
          <p className="cardBody-name">{item.name}</p>
          <p className="cardBody-date">
            <span className="fw-bold">{today}</span>, {todayDate}
          </p>
          <p className="cardBody-price">
            Price :{" "}
            {item.price.toLocaleString("ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <p className="cardBody-quantity">Qty : {item.orderQuantity.value}</p>
          <p className="cardBody-sub">
            Sub Total :{" "}
            {subtotal.toLocaleString("ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
      <div className="right-logo">
        <img
          src={LogoIcon}
          alt="waysbean"
          style={{ width: "5rem", margin: "auto" }}
        />
        <img
          src={QRC}
          alt="qrcode"
          style={{ width: "3rem", margin: "auto", marginBottom: "10px" }}
        />
        <div
          className={
            status === "Success"
              ? "success"
              : status === "Waiting Approve"
              ? "wait"
              : status === "Cancel" && "cancel"
          }
        >
          {status === "On The Way" ? (
            <img
              src={BtnComplete}
              alt=""
              onClick={(e) => {
                e.preventDefault();
                onAction("Success", e);
                setStatus(true);
              }}
              className="cursor-pointer"
            />
          ) : (
            <p className="status-text">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
