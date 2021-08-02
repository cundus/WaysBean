import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/UserContext";

import "./Detail.css";

const DetailProduct = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(UserContext);

  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getProduct();
    return () => {
      setData(null);
    };
  }, []);

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

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="detail-container">
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
        <button disabled={true} className="button-dominant mt-3  fullwidth">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;
