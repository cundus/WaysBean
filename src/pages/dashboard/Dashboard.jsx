import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CancelBtn from "../../assets/CancelBtn.svg";
import ApproveBtn from "../../assets/ApproveBtn.svg";
import CancelIcon from "../../assets/cancel.svg";
import SuccessIcon from "../../assets/success.svg";

import Helmet from "react-helmet";
import { API } from "../../config/api";
import Loader from "../../components/loader/Loader";

const Dashboard = () => {
  const [transaction, setTransaction] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getTransactions();
  }, [status]);

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/transactions");
      // console.log(res.data.data);
      setIsLoading(false);
      setTransaction(res.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard | WaysBean</title>
      </Helmet>
      <div className="containerTable">
        <p className="fs-3 mb-4 color-dominant fw-bold">Income Transaction</p>
        <table className="table table-bordered border-dark">
          <thead>
            <tr style={{ backgroundColor: "#E5E5E5" }}>
              <th scope="col" style={{ width: "2rem" }}>
                No
              </th>
              <th scope="col">Name</th>
              <th scope="col" style={{ width: "12rem" }}>
                Address
              </th>
              <th scope="col" style={{ width: "7rem" }}>
                Post Code
              </th>
              <th scope="col">Product Order</th>
              <th scope="col">Status</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>

          {transaction
            ? transaction.map((item, index) => (
                <Td
                  item={item}
                  key={index}
                  index={index}
                  setStatus={setStatus}
                />
              ))
            : null}
        </table>
      </div>
    </div>
  );
};

export const Td = ({ item, index, setStatus }) => {
  const onAction = async (value, e) => {
    e.preventDefault();
    setStatus(true);
    const body = { ...item, status: value };
    await API.patch(`/edit-transaction/${item.id}`, body);
  };

  const WaitingButton = (
    <div className="text-center">
      <img
        src={CancelBtn}
        alt=""
        onClick={(e) => onAction("Cancel", e)}
        className="cursor-pointer"
      />{" "}
      <img
        src={ApproveBtn}
        alt=""
        onClick={(e) => onAction("On The Way", e)}
        className="cursor-pointer"
      />
    </div>
  );

  return (
    <>
      <tbody>
        <tr>
          <th key={index} scope="row">
            {index + 1}
          </th>
          <td>{item.name}</td>
          <td>{item.address} </td>
          <td>{item.codePost}</td>
          <td> {item.Products.map((product) => `${product.name}, `)}</td>
          <td
            className={
              item.status === "Waiting Approve"
                ? "text-warning text-center"
                : item.status === "Cancel"
                ? "text-danger  text-center"
                : item.status === "Success"
                ? "text-success text-center"
                : item.status === "On The Way" && "text-primary text-center"
            }
          >
            {item.status}
          </td>
          <td>
            {item.status === "Waiting Approve" ? (
              WaitingButton
            ) : item.status === "Cancel" ? (
              <div className="text-center">
                <img src={CancelIcon} alt="" />
              </div>
            ) : item.status === "Success" || item.status === "On The Way" ? (
              <div className="text-center">
                <img src={SuccessIcon} alt="" className="text-center" />
              </div>
            ) : null}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Dashboard;
