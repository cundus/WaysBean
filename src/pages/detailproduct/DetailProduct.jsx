import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/api/v1/product/${id}`)
      .then((res) => {
        // console.log("Detail", res.data.data);
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Cannot Get Data");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <h4>{data.price}</h4>
      <p>{data.description}</p>
      <h6>{data.stock}</h6>
    </div>
  );
};

export default DetailProduct;
