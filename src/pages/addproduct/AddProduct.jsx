import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Add.css";
import UploadIcon from "../../assets/UploadIcon.svg";

import axios from "axios";
import { API } from "../../config/api";

const AddProduct = () => {
  const [preview, setPreview] = React.useState(null);
  const [name, setName] = React.useState("");
  const [stock, setStock] = React.useState();
  const [price, setPrice] = React.useState();
  const [description, setDescription] = React.useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        name: name,
        stock: stock,
        price: price,
        description: description,
        photo: preview.name,
      };

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const body = JSON.stringify({ ...data });
      console.log(data);
      await API.post("/add-product", body, config);

      alert("Berhasil Tambah Data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="add-form-container">
        <div className="left-container">
          <h2 className="color-dominant fw-bold mb-3">Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="form-dominant color-dominant"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput2">
              <Form.Control
                required
                type="number"
                placeholder="Stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-dominant color-dominant"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput3">
              <Form.Control
                required
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                required
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-dominant color-dominant"
              />
            </Form.Group>
            <div className="form-dominant color-dominant uploadForm mb-3">
              <label htmlFor="upload">
                {preview ? preview.name : "Photo Product"}{" "}
                <img src={UploadIcon} alt="upload" width="15px" />
              </label>
              <input
                required
                type="file"
                hidden
                id="upload"
                name="photo"
                onChange={(e) => {
                  setPreview(e.target.files[0]);
                  // setImage(e.target.files[0].name);
                }}
              />
            </div>
            <center>
              <Button
                className="button-dominant medium-width mt-3"
                type="submit"
              >
                Add Product
              </Button>
            </center>
          </Form>
        </div>
        <div className="right-container">
          {preview && preview !== null ? (
            <img
              src={URL.createObjectURL(preview)}
              alt="preview"
              className="preview-image"
            />
          ) : (
            <h1>Preview</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
