import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Add.css";
import UploadIcon from "../../assets/UploadIcon.svg";

import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import PopUp from "../../components/modals/PopUp";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  const history = useHistory();
  const [preview, setPreview] = React.useState(null);
  const [name, setName] = React.useState("");
  const [stock, setStock] = React.useState();
  const [price, setPrice] = React.useState();
  const [description, setDescription] = React.useState("");
  const [showPop, setShowPop] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("name", name);
      data.append("stock", stock);
      data.append("price", price);
      data.append("description", description);
      data.append("photo", preview);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      await API.post("/add-product", data, config);
      setShowPop(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeAfterAdd = () => {
    setShowPop(false);
    history.push("/");
  };

  return (
    <div>
      <Helmet>
        <title>Add Product | WaysBean</title>
      </Helmet>
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
      <PopUp
        show={showPop}
        hide={closeAfterAdd}
        message={"Success Add New Product"}
      />
    </div>
  );
};

export default AddProduct;
