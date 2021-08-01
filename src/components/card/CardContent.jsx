import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CardContent = () => {
  const history = useHistory();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/api/v1/products")
      .then((res) => {
        console.log("SUKSES", res.data.data);
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Cannot Get Data");
        setIsLoading(false);
      });
  };

  const handleClickToDetail = (id) => {
    history.push(`product/${id}`);
  };

  if (isLoading) return <p>... Loading</p>;

  return (
    <div>
      <Row>
        {data.map((item, index) => (
          <Col md={3}>
            <Card
              style={{ width: "15rem", marginBottom: "2em" }}
              key={index}
              onClick={() => handleClickToDetail(item.id)}
            >
              <Card.Img
                src={item.photo}
                alt={item.photo}
                style={{ width: "15rem", height: "20rem", objectFit: "cover" }}
              />
              <Card.Body
                style={{ backgroundColor: "#F6E6DA", color: "#613d2b" }}
              >
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text style={{ marginBottom: "0" }}>
                  {item.description}
                </Card.Text>
                <Card.Text>{item.stock}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardContent;
