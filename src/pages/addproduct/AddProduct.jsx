import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const [data, setData] = React.useState({
    name: "",
    stock: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ ...data });
    await axios
      .post("http://localhost:4000/api/v1/add-product", body, config)
      .then((res) => {
        console.log(res);
        setData({
          name: "",
          stock: "",
          price: "",
          description: "",
        });
        alert("Berhasil add data");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput2">
          <Form.Control
            type="number"
            placeholder="Stock"
            name="stock"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ControlInput3">
          <Form.Control
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Photo Product</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
